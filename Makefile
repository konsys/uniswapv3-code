.PHONY: test

anvil:
	anvil --code-size-limit 50000

deploy:
	forge script scripts/DeployDevelopment.s.sol --broadcast --fork-url "http://localhost:8545" --private-key "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80" --code-size-limit 50000

update-abis:
	forge inspect UniswapV3Factory abi > ui/src/abi/Factory.json
	forge inspect UniswapV3Manager abi > ui/src/abi/Manager.json
	forge inspect UniswapV3Pool abi > ui/src/abi/Pool.json
	forge inspect UniswapV3Quoter abi > ui/src/abi/Quoter.json

test:
	forge test --ffi