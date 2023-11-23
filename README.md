# using yarn, typescript

# npx react-native-asset to add fonts

note API orderFuture : 
  /// amount là số lượng order 
  // regime là Cross hoặc Isolated
  // core là x đòn bẫy
  // symbol là cặp trade
  // side là trade buy hoạc sell
  // typeTrade là đặt lệnh Limit hoặc Market
  // priceLimit nếu typeTrade là Limit thì thêm priceLimit vào



28500.0 | BTCUSDT USDⓈ-Margined Perpetual | Binance Futures
https://testnet.binancefuture.com


Trong tab futures, dưới ô price, Nếu chọn BTC thì amount = amount * tỉ giá realtime của BTC, sửa lại ô BTC vs USDT có thể chọn được. 

Dưới chữ BTC (USDT) của api positions sửa lại theo công thức buy = (tỉ giá - entryPrice) * amountCoin.

Làm chức năng nút close position và close all trong tab futures mục positions

Trong overview, spot xoá list coin để lại usdt vs balance

Trong overview đẻ lại mục spot vs usds-m futures. còn mấy mục khác để chữ commision. chữ màu đen bên phải mục Spot = balance * tỉ giá realtime, chữ màu xám bên dưới = balance

# position
PNL
if (side == 'buy') {
  PNL = (giá hiện tại của đồng coin - position.entryPrice) * position.amountCoin
} else {
  PNL = (position.entryPrice - giá hiện tại của đồng coin) * position.amountCoin
}

ROE = PNL / position.margin * 100

SIZE (USDT) = position.margin * position.core

Mark Price = giá hiện tại của đồng coin

RISK = 0.01
if (position.regime === 'isolated' && position.liquidationPrice !== 0) {
    RISK = (SIZE * giá hiện tại của đồng coin * (1 / position.core)) / 
    position.liquidationPrice
    RISK = RISK / 1000
    if (ROE < 0) {
      RISK = RISK + ROE
    } else {
      RISK = RISK - ROE
    }
    if (RISK > 64) RISK = 64
}
nếu risk lớn hơn 64 thì risk = 64

liq.Price
if (position.regime === 'cross' && position.side === 'sell') {
    liq.Price = số dư tài khoản / (position.margin * position.core) * position.entryPrice
} else {
    liq.Price = position.liquidationPrice
}

# TP/SL
làm phân TP/SL bên trade future, api orderFuture thêm data vào nếu user dùng TP/SL

/// amount là số lượng order 
// regime là Cross hoặc Isolated
// core là x đòn bẫy
// symbol là cặp trade
// side là trade buy hoạc sell
// typeTrade là đặt lệnh Limit hoặc Market
// priceLimit nếu typeTrade là Limit thì thêm priceLimit vào
// triggerTP , triggerSL là MarK hoặc Last (nếu user không truyền data thì để là undefine)
// TP (user không truyền data thì để là undefine) nếu side là buy thì không được thấp hơn price hiện tại, sell thì không được cao hơn price hiện tại ( price chốt lời)
// SL (user không truyền data thì để là undefine) nếu side là buy thì không được cao hơn price hiện tại, sell thì không được thấp hơn price hiện tại ( price chốt lỗ)

validation TP/SL
// triggerTP , triggerSL là MarK hoặc Last (nếu user không truyền data thì để là undefine)

// TP (user không truyền data thì để là undefine) nếu side là buy thì không được thấp hơn price hiện tại, sell thì không được cao hơn price hiện tại ( price chốt lời)

// SL (user không truyền data thì để là undefine) nếu side là buy thì không được cao hơn price hiện tại, sell thì không được thấp hơn price hiện tại ( price chốt lỗ)
/// Nếu user dùng typeTrade=="Limit" thì lấy priceLimit thay thế cho price hiện tại


show TP/SL bên openOrder hoặc lịch sử trade 
/// Lịch sử openOrder nếu typeTrade ="Take Profit Market" hoặc typeTrade="Stop Market" và idPositon == 0 thì cho user View TP/SL (CALL API viewTPSL), data view TP/SL nếu có TP thì show giao diện TP Data Side = data.side, Data amount = PnL ở giá TP, Stop Price = TP, Trigger = data.triggerTP, Reduce Only auto là true .( SL cũng tương tự như TP nếu có data thì show)

/// Lịch sử openOrder nếu typeTrade ="Limit" và có data TP hoặc SL thì cho user View TP/SL (amount TP sẽ là : amountPnL_TP) (amount SL sẽ là : amountPnL_SL)

/// Lịch sử openOrder nếu typeTrade ="Take Profit Market" hoặc typeTrade="Stop Market" thì Reduce Only sẽ auto là Yes ngược lại là No, nếu là TP và side == sell Trigger Conditions sẽ là : `${data.triggerTP} Price >= ${TP}` nếu side là == buy là : `${data.triggerTP} Price <= ${TP}` SL ngược lại tương tự                  /// 

/// Lịch sử openOrder nếu typeTrade ="Take Profit Market" hoặc typeTrade="Stop Market"  có amount ==0 thì show amount là : "Close Position" và không xem đc TP/SL trong open order 

# setTPSLPosition
muốn có data trên thì dùng api setTPSLPosition (Cài đặt TP/SL cho vị thế)
/api/binance/setTPSLPosition
{
    "idPosition" : "60",
    "TP" : 28000,
    "triggerTP" : "Mark",
    "SL" : 23000,
    "triggerSL" : "Mark"
}
// triggerTP , triggerSL là MarK hoặc Last (nếu user không truyền data thì để là undefine)
// TP (user không truyền data thì để là undefine) nếu side là buy thì không được thấp hơn price hiện tại, sell thì không được cao hơn price hiện tại ( price chốt lời)
// SL (user không truyền data thì để là undefine) nếu side là buy thì không được cao hơn price hiện tại, sell thì không được thấp hơn price hiện tại ( price chốt lỗ)
/// Lưu ý : 
* Nếu position đã có TP hoặc SL rồi thì phải cancel TP hoặc SL thì mới cài đặt TP/SL mới được
dùng API /api/binance/setCancelSLPosition hoặc /api/binance/setCancelSLPosition để cancel lệnh

{
    "idPosition" : "60"
}


