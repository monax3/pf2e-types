import { Size } from '../../data.ts';
import { PartialPrice, RawCoins } from './data.ts';
/** Coins class that exposes methods to perform operations on coins without side effects */
declare class Coins implements RawCoins {
    cp: number;
    sp: number;
    gp: number;
    pp: number;
    constructor(data?: RawCoins | null);
    /** The total value of this coins in copper */
    get copperValue(): number;
    get goldValue(): number;
    plus(coins: RawCoins): Coins;
    /** Multiply by a number and clean up result */
    scale(factor: number): Coins;
    /** Increase a price for larger physical-item sizes */
    adjustForSize(size: Size): Coins;
    /** Returns a coins data object with all zero value denominations omitted */
    toObject(): RawCoins;
    /** Parses a price string such as "5 gp" and returns a new CoinsPF2e object */
    static fromString(coinString: string, quantity?: number): Coins;
    static fromPrice(price: PartialPrice, factor: number): Coins;
    /** Creates a new price string such as "5 gp" from this object */
    toString(): string;
}
declare const coinCompendiumIds: {
    pp: string;
    gp: string;
    sp: string;
    cp: string;
};
export { coinCompendiumIds, Coins };
