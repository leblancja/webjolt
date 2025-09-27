{
  description = "Basic nodejs environment with latest Node LTS. Includes Typescript.";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {inherit system;};
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          nodejs
          pnpm
          typescript
        ];
        shellHook = ''
          echo "NodeJS environment active"
          echo "Node version: $(node --version)"
          echo "npm version: $(npm --version)"
          echo "pnpm version: $(pnpm --version)"
          export NPM_CONFIG_PREFIX=$PWD/.npm-global
          export PNPM_HOME=$PWD/.pnpm-global
          export PATH=$NPM_CONFIG_PREFIX/bin:$PATH
          export PATH=$PNPM_HOME:$PATH
          mkdir -p .npm-global .pnpm-global
        '';
      };
    });
}
