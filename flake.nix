{
  description = "Utensils.io website development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    devshell.url = "github:numtide/devshell";
    devshell.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = { self, nixpkgs, devshell, ... }:
    {
      devShells = nixpkgs.lib.genAttrs [ "x86_64-linux" "x86_64-darwin" "aarch64-linux" "aarch64-darwin" ] (
        system:
        let
          pkgs = import nixpkgs {
            inherit system;
            overlays = [ devshell.overlays.default ];
            config = {
              allowUnfree = true;
            };
          };
        in
        {
          default = pkgs.devshell.mkShell {
            name = "utensils-website";
            
            packages = with pkgs; [
              nodejs_22
              yarn
            ];

            # No environment variables needed
            env = [];

            # Define commands that will be available in the devshell
            commands = [
              {
                name = "dev";
                help = "Start the development server";
                command = "yarn dev";
              }
              {
                name = "build";
                help = "Build the site for production";
                command = "yarn build";
              }
              {
                name = "start";
                help = "Start the production server";
                command = "yarn start";
              }
              {
                name = "install-deps";
                help = "Install dependencies";
                command = "yarn install --frozen-lockfile";
              }
            ];

            # Add node_modules/.bin to PATH
            devshell.startup.nodejs-bin-in-path = {
              text = ''
                export PATH="$PWD/node_modules/.bin:$PATH"
              '';
              deps = [];
            };

            # Auto-install dependencies if needed
            devshell.startup.install-deps = {
              text = ''
                if [ ! -d "node_modules" ]; then
                  echo "Installing dependencies..."
                  yarn install --frozen-lockfile
                fi
              '';
              deps = [];
            };
          };
        }
      );
    };
}
