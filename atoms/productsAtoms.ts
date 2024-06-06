import { atom } from "jotai";
import { Product } from "@/lib/schemas/productSchema";
import { atomWithStorage } from "jotai/utils";
import { CartItem, Color, SelectedColorVariantType, Size } from "@/lib/types";
import { COLOR_VARIANT, SIZE_VARIANT } from "@/constants";

export const productListAtom = atom<Product[]>([]);

export const productVariantsSizeAtom = atom<Size[]>(SIZE_VARIANT);

export const productVariantsColorAtom = atom<Color[]>(COLOR_VARIANT);

export const selectedColorVariantAtom = atom<SelectedColorVariantType>(
  {} as SelectedColorVariantType
);

export const productAtom = atom<Product | null>(null);

const initialCartState: CartItem[] = [];

// export const cartAtom = atom<CartItem[]>([]);

export const cartAtom = atomWithStorage<CartItem[]>("cart", initialCartState);

export const viewedProductsAtom = atomWithStorage<number[]>(
  "viewedProducts",
  []
);

export const darkModeAtom = atomWithStorage("darkmode", false);

export const requestUsers = async () => {
  return fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-cache",
  }).then((res) => res.json());
};

type Users = Record<string, unknown>[] | Promise<Record<string, unknown>[]>; // to accept sync and async values

export const usersAtom = atom<Users>([]);

export const countAtom = atom(1);

export const asyncIncrementAtom = atom(null, async (get, set) => {
  // await something
  set(countAtom, get(countAtom) + 1);
});

/*

const Page = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom)

  return (
    <>
      <h1>Welcome to {darkMode ? 'dark' : 'light'} mode!</h1>
      <button onClick={() => setDarkMode(!darkMode)}>toggle theme</button>
    </>
  )
}

*/

/*


import { atom, useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'

// https://jotai.org/docs/utilities/ssr

const countAtom = atom(0)
const CounterPage = ({ countFromServer }) => {
  useHydrateAtoms([[countAtom, countFromServer]]); // atomname, atomvalue (manually hydrating so CounterPage gets latest)
  const [count] = useAtom(countAtom)
  // count would be the value of `countFromServer`, not 0.
}


// instead of throwing from async requests, use "loadable"

{
    state: 'loading' | 'hasData' | 'hasError',
    data?: any,
    error?: any,
}
import { loadable } from "jotai/utils"

const asyncAtom = atom(async (get) => ...)
const loadableAtom = loadable(asyncAtom)
// Does not need to be wrapped by a <Suspense> element
const Component = () => {
  const [value] = useAtom(loadableAtom)
  if (value.state === 'hasError') return <Text>{value.error}</Text>
  if (value.state === 'loading') {
    return <Text>Loading...</Text>
  }
  console.log(value.data) // Results of the Promise
  return <Text>Value: {value.data}</Text>
}

// for the heavy images


import { atomWithLazy } from 'jotai/utils'

// passing the initialization function
const imageDataAtom = atomWithLazy(initializeExpensiveImage)

function Home() {
  ...
}

function ImageEditor() {
  // only gets initialized if user goes to `/edit`.
  const [imageData, setImageData] = useAtom(imageDataAtom);
  ...
}

function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/edit" component={ImageEditor} />
    </Router>
  )
}

// RESET: to the initial value

import { atom, useSetAtom } from 'jotai'
import { atomWithReset, useResetAtom, RESET } from 'jotai/utils'

const dollarsAtom = atomWithReset(0)
const centsAtom = atom(
  (get) => get(dollarsAtom) * 100,
  (get, set, newValue: number | typeof RESET) =>
    set(dollarsAtom, newValue === RESET ? newValue : newValue / 100)
)

const ResetExample = () => {
  const setDollars = useSetAtom(dollarsAtom)
  const resetCents = useResetAtom(centsAtom)

  return (
    <>
      <button onClick={() => setDollars(RESET)}>Reset dollars</button>
      <button onClick={resetCents}>Reset cents</button>
    </>
  )
}


import { useResetAtom } from 'jotai/utils'
import { todoListAtom } from './store'

const TodoResetButton = () => {
  const resetTodoList = useResetAtom(todoListAtom)
  return <button onClick={resetTodoList}>Reset</button>
}

// atomFamily : it simply returns an atom (if it's already created it will return from cache otherwise create)


import type { PrimitiveAtom } from 'jotai'

/**
 * here the atom(id) returns a PrimitiveAtom<number>
 * and PrimitiveAtom<number> is a WritableAtom<number, SetStateAction<number>>
const myFamily = atomFamily((id: number) => atom(id)).
 */

/*

import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'

const todoFamily = atomFamily((name) => atom(name))

todoFamily('foo')

// this will create a new atom('foo'), or return the one if already created


import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'

const todoFamily = atomFamily((name) =>
  atom(
    (get) => get(todosAtom)[name],
    (get, set, arg) => {
      const prev = get(todosAtom)
      set(todosAtom, { ...prev, [name]: { ...prev[name], ...arg } })
    },
  ),
)


import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'

const todoFamily = atomFamily(
  ({ id, name }) => atom({ name }),
  (a, b) => a.id === b.id,
)

// selector


const defaultPerson = {
  name: {
    first: 'Jane',
    last: 'Doe',
  },
  birth: {
    year: 2000,
    month: 'Jan',
    day: 1,
    time: {
      hour: 1,
      minute: 1,
    },
  },
}

// Original atom.
const personAtom = atom(defaultPerson)

// Tracks person.name. Updated when person.name object changes, even
// if neither name.first nor name.last actually change.
const nameAtom = selectAtom(personAtom, (person) => person.name)

// Tracks person.birth. Updated when year, month, day, hour, or minute changes.
// Use of deepEquals means that this atom doesn't update if birth field is
// replaced with a new object containing the same data. E.g., if person is re-read
// from a database.
const birthAtom = selectAtom(personAtom, (person) => person.birth, deepEquals)


// cache: https://jotai.org/docs/extensions/cache 


// Typescript


const numAtom = atom<number | null>(0);
const arrAtom = atom<string[]>([]);

//  # Read only derived atoms

const readOnlyAtom = atom((get) => get(numAtom));
// const asyncReadOnlyAtom = atom(async (get) => await get(someAsyncAtom));


# Write only atoms
const writeOnlyAtom = atom(null, (_get, set, str: string) => set(fooAtom, str))
const multipleArgumentsAtom = atom(
  null,
  (_get, set, valueOne: number, valueTwo: number) =>
    set(fooAtom, Math.max(valueOne, valueTwo))
);

# Read/Write atoms
const readWriteAtom = atom(
  (get) => get(strAtom),
  (_get, set, num: number) => set(strAtom, String(num))
)
const asyncReadWriteAtom = atom(
  async (get) => await get(asyncStrAtom),
  (_get, set, num: number) => set(strAtom, String(num))
)


const asyncStrAtom = atom<Promise<string>>(async () => 'foo')

const writeOnlyAtom = atom<null, [string, number], void>(
  null,
  (_get, set, stringValue, numberValue) => set(fooAtom, stringValue),
)


const readWriteAtom = atom<Promise<string>, [number], void>(
  async (get) => await get(asyncStrAtom),
  (_get, set, num) => set(strAtom, String(num)),
)


const [num, setNum] = useAtom(primitiveNumAtom)
const [num] = useAtom(readOnlyNumAtom)
const [, setNum] = useAtom(writeOnlyNumAtom)

## working with multiple atoms



## Resettable (to the default value)



*/
