import * as React from "react";

type Dict<T> = { [i: string]: T };
type SetState<T> = React.Dispatch<React.SetStateAction<T>> | ((arg: T) => void);

interface SetStatePropForArray {
  (prop: number): SetState<any>;
  (prop: Array<string | number>): SetState<any>;
  (prop: number, value: SetState<any>): void;
  (prop: Array<string | number>, value: SetState<any>): void;
}

interface SetStatePropForDict<T> {
  (prop: keyof T): SetState<any>;
  (prop: Array<string | number>): SetState<any>;
  (prop: keyof T, value: SetState<any>): void;
  (prop: Array<string | number>, value: SetState<any>): void;
}

export default function <T extends Array<any>>(
  setState: SetState<T>
): SetStatePropForArray;

export default function <T extends Dict<any>>(
  setState: SetState<T>
): SetStatePropForDict<T>;
