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
              nodePackages_latest.localtunnel
              nodePackages.eslint
              nodePackages.prettier
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
              {
                name = "lint";
                help = "Run ESLint to check code quality";
                command = "yarn lint";
              }
              {
                name = "lint-fix";
                help = "Run ESLint with auto-fix to fix code style issues";
                command = "yarn lint:fix";
              }
              {
                name = "preview-test";
                help = "Start dev server and create localtunnel for testing link previews, or sharing";
                command = ''#!/usr/bin/env bash
                  # Create a cleanup function to kill all child processes
                  function cleanup() {
                    echo "\nCleaning up processes..."
                    # Kill all child processes in this process group
                    pkill -P $$
                    exit 0
                  }
                  
                  # Set trap to call cleanup on exit signals
                  trap cleanup SIGINT SIGTERM EXIT
                  
                  # Start dev server and capture its PID
                  echo "Starting dev server..."
                  yarn dev &
                  DEV_PID=$!
                  
                  # Wait for server to start
                  echo "Waiting for dev server to start..."
                  sleep 5
                  
                  # Check which port the server is using
                  PORT=3000
                  if ! lsof -i :3000 | grep -q "LISTEN"; then
                    if lsof -i :3001 | grep -q "LISTEN"; then
                      PORT=3001
                    elif lsof -i :3002 | grep -q "LISTEN"; then
                      PORT=3002
                    fi
                  fi
                  
                  echo "\n💻 Server running on port $PORT\n"
                  
                  # Start localtunnel in foreground with a custom subdomain
                  # You can customize the subdomain to make it more memorable
                  lt --port $PORT --subdomain utensils-preview
                '';
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
