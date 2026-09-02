// Apple Object Capture CLI for recon_mac.py — compiled on first use, see there.
//
//   objcap <imagesDir> <output.usdz|output.obj> <preview|reduced|medium|full|raw> [poses.json]
//
// Runs RealityKit PhotogrammetrySession on the images and writes the model plus
// (optionally) per-image camera poses {"IMG.JPG": {"t": [x,y,z], "q": [x,y,z,w]}}
// in the model's local frame — recon_mac.py fits those against geotags.
import Foundation
import RealityKit

@main
struct ObjCap {
    static func main() async {
        let args = CommandLine.arguments
        guard args.count >= 4 else {
            FileHandle.standardError.write(Data("usage: objcap <imagesDir> <out.usdz|out.obj> <detail> [poses.json]\n".utf8))
            exit(2)
        }
        let input = URL(fileURLWithPath: args[1], isDirectory: true)
        let outURL = URL(fileURLWithPath: args[2])
        let details: [String: PhotogrammetrySession.Request.Detail] =
            ["preview": .preview, "reduced": .reduced, "medium": .medium, "full": .full, "raw": .raw]
        guard let detail = details[args[3]] else { FileHandle.standardError.write(Data("bad detail\n".utf8)); exit(2) }
        let posesOut = args.count > 4 ? args[4] : nil

        var config = PhotogrammetrySession.Configuration()
        config.sampleOrdering = .unordered
        config.featureSensitivity = .normal
        config.isObjectMaskingEnabled = false  // whole scene, not a masked object

        do {
            let session = try PhotogrammetrySession(input: input, configuration: config)
            var requests: [PhotogrammetrySession.Request] = [.modelFile(url: outURL, detail: detail)]
            if posesOut != nil { requests.append(.poses) }
            try session.process(requests: requests)
            var lastPct = -5.0
            for try await output in session.outputs {
                switch output {
                case .requestProgress(_, let f):
                    if f * 100 >= lastPct + 5 { lastPct = f * 100; print(String(format: "progress %.0f%%", f * 100)); fflush(stdout) }
                case .requestComplete(_, let result):
                    if case .modelFile(let url) = result { print("model \(url.path)") }
                    if case .poses(let poses) = result, let posesOut {
                        var dict = [String: [String: [Float]]]()
                        for (k, pose) in poses.posesBySample {
                            let name = poses.urlsBySample[k]?.lastPathComponent ?? String(k)
                            dict[name] = ["t": [pose.translation.x, pose.translation.y, pose.translation.z],
                                          "q": [pose.rotation.vector.x, pose.rotation.vector.y, pose.rotation.vector.z, pose.rotation.vector.w]]
                        }
                        let data = try JSONSerialization.data(withJSONObject: dict)
                        try data.write(to: URL(fileURLWithPath: posesOut))
                        print("poses \(dict.count)")
                    }
                case .requestError(let req, let err):
                    FileHandle.standardError.write(Data("request error (\(req)): \(err)\n".utf8)); exit(1)
                case .invalidSample(let id, let reason): print("invalid sample \(id): \(reason)")
                case .skippedSample(let id): print("skipped sample \(id)")
                case .automaticDownsampling: print("automatic downsampling")
                case .processingCancelled: exit(1)
                case .processingComplete: print("done"); exit(0)
                case .inputComplete: print("input complete")
                @unknown default: break
                }
            }
        } catch {
            FileHandle.standardError.write(Data("fatal: \(error)\n".utf8)); exit(1)
        }
    }
}
