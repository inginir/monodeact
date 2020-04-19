## to add a lib or app

- make sure the package.json name is named appropriately @monodeact/package_name
- add app config in lib/config so it appears on theserver and dashboard

## monorepo tips

- `yarn workspaces run [command]
  to run a command in all workspaces

### to add a local package into another yarn add frontend@1.0.0

Be warned if you omit the version number, you run the risk of including an external dependency from NPM instead of our local subproject.
