
import HyperswitchCardScan //TBD
@objc(HyperswitchScancard)
class HyperswitchScancard: NSObject {

    @objc
    func launchScanCard(_ rnMessage: String, _ rnCallback: @escaping RCTResponseSenderBlock) {

        DispatchQueue.main.async {
            var message: Dictionary<String, Any> = [:]
            let cardScanSheet = CardScanSheet()
            cardScanSheet.present(from: RCTPresentedViewController()!) { result in

                switch result {
                case .completed(var card as ScannedCard?):
                    message["pan"] = card?.pan
                    message["name"] = card?.name
                    message["expiryMonth"] =  card?.expiryMonth
                    message["expiryYear"] =  card?.expiryYear

                case .canceled:
                    message["error"] = "Scan Canceled"
                case .failed(let error):
                    message["error"] = "Failed with error: \(error.localizedDescription)"

                }
                rnCallback([message])
            }
        }
    }
}

