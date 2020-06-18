# use-prop-change
`use-prop-change` React hook for simplifying `setState` decomposition into smaller setters for particular state parts.
It can usefull when you need:
- transfer control over part of the state to another component;
- set or change some data in nested state tree;
- simplify working with forms without big library;

[example on codesandbox](https://codesandbox.io/s/use-prop-change-example-n2lrr?file=/src/containers/UserForm.tsx)

## Install

```sh
$ npm install use-prop-change
```
or

```sh
$ yarn add use-prop-change
```

## Usage Example
```javascript
import React, { useState } from "react";
import usePropChange from "use-prop-change";

import Friends from "./Friends"; // this component responsible for friends field

const forInput = (handler) => (e) => handler(e.target.value);

const defaultPerson = {
  name: "Dasha",
  age: "23",
  friends: [
    /* whatever here */
  ],
};

export const PersonForm = () => {
  const [person, setPerson] = useState(defaultPerson);

  const handlePersonProp = usePropChange(setPerson);

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

## How it works?
`use-prop-change` use [ramda lens](https://ramdajs.com/docs/#lens) under the hood.
But you don't need understand them to use this hook.

For example above we can replace
```javascript
const handlePersonProp = usePropChange(setPerson);
```
to
```javascript
const handlePersonProp = (name) => (value) => {
  setPerson((prevState) => ({
    ...prevState,
    [name]: typeof value === "function" ? value(prevState[name]) : value,
  }));
};
```
But note, `handlePersonProp` returned from `usePropChange` more powerfull:
- if first argument is number, new state will be an Array
- if first argument is string, new state will be an Object
- if first argument is array, state will be changed on this path
- 2 arguments (name and value) can be passed together, to just make changes once

You can see all this on [example](https://codesandbox.io/s/use-prop-change-example-n2lrr?file=/src/containers/UserForm.tsx)
