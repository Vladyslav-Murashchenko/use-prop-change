# use-set-prop
`use-set-prop` React hook for simplifying `setState` decomposition into smaller functions for particular state part.
It can usefull when you need:
- transfer control over part of the state to another component
- set or change some data in nested state tree;

[example on codesandbox](https://codesandbox.io/s/g8512?file=/src/containers/UserForm.tsx)

# Getting started

## Install

```sh
$ npm install use-set-prop
```
or

```sh
$ yarn add use-set-prop
```

## Usage Example
```javascript
import React, { useState } from "react";
import useSetProp from "use-set-prop";

import Friends from "./Friends"; // this component responsible for friends field

const forInput = (handler) => (e) => handler(e.target.value);

const defaultPerson = {
  name: "Dasha",
  age: "23",
  friends: [
    /* what ever here */
  ],
};

export const PersonForm = () => {
  const [person, setPerson] = useState(defaultPerson);

  const setPersonProp = useSetProp(setPerson);
  // Result of useSetProp in this case just the same as:
  // const setPersonProp = (name) => (value) => {
  //   setPerson((prevState) => ({
  //     ...prevState,
  //     [name]: typeof value === "function" ? value(prevState[name]) : value,
  //   }));
  // };

  return (
    <form onSubmit={/* do something */}>
      <input value={person.name} onChange={forInput(setPersonProp("name"))} />
      <input value={person.age} onChange={forInput(setPersonProp("age"))} />
      <Friends
        friends={person.friends}
        onFriendsChange={setPersonProp("friends")}
      />
    </form>
  );
};
```
