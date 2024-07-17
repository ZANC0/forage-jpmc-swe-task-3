import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc:number,
  price_def:number,
  ratio:number,
  upper:number,
  lower:number
  trigger:number | undefined,
  timestamp: Date,
  
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2
    const ratio = priceABC/priceDEF
    const upperBound = 1 + 0.05
    const lowerBound = 1 - 0.05
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
      upper: upperBound,
      lower: lowerBound,
      trigger: (ratio > upperBound || ratio < lowerBound ? ratio : undefined)
    }
  }
}
