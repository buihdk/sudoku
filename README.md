# Sudoku

A Sudoku game built as a React PWA with Redux. Puzzles are generated in the browser and state is saved with redux-persist.

Live version is at https://buihdk.github.io/sudoku/.

## Controls

- Click a cell or use the arrow keys to move the selection.
- Press a digit from 1 to 9 to fill the selected cell.
- A wrong guess adds to the incorrect count.
- Fill every cell correctly to win.
- Press New Game to start over.

## Requirements

This project uses Create React App 4 with react-scripts 4.0.3. That toolchain needs the legacy OpenSSL provider on Node 17 and above. Set the flag before running.

```sh
export NODE_OPTIONS=--openssl-legacy-provider
```

Migrating to a newer toolchain is tracked as follow up work.

## Scripts

```sh
yarn start   # run the dev server
yarn build   # build for production
yarn test    # run the test suite
yarn deploy  # publish the build to GitHub Pages
```

## Tech

- React 17 and Redux
- redux-persist for saved state
- styled-components for styling
- TypeScript

## License

MIT. See [LICENSE](./LICENSE).
