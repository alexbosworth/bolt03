# BOLT 03 Utilities

Utilities for working with Lightning Network [BOLT 03](https://github.com/lightningnetwork/lightning-rfc/blob/master/03-transactions.md)

## Methods

### channelResolution

Channel resolution details from witness

    {
      witness: [<Witness Hex String>]
    }

    @returns
    {
      [type]: <Channel Resolution Type String>
    }

### isRemedyWitness

Determine if witness elements represent a to_local breach remedy witness

    {
      witness: [<Witness Element Number or Buffer>]
    }

    @returns
    {
      is_remedy: <Witness Elements Are Breach Remedy Witness Elements Bool>
    }

### resolutionType

Get resolution type of input

    {
      transaction: <Transaction Hex String>
      vin: <Transaction Input Index Number>
    }

    @throws
    <Error>

    @returns
    {
      type: <Resolution Type String>
    }
