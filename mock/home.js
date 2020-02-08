const cloudCompute = {
  priceETH: 0.023,
  priceRMB: 480,
  preProduction: 0.0013,
  freeHash: 3000
}
const mineMachine = {
  name: 'G1',
  info: 'p106-100 *6',
  power: 1800,
  electricCharge: 0.35,
  preProduction: 0.0012
}
export default [
  {
    url: '/home/items',
    type: 'post',
    response: config => {
      return {
        code: 2000,
        data: {
          cloudCompute: cloudCompute,
          mineMachine: mineMachine
        }
      }
    }
  }
]
