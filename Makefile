.PHONY: test

anvil:
	anvil --code-size-limit 50000

deploy:
	forge script scripts/DeployDevelopment.s.sol --broadcast --fork-url "http://localhost:8545" --private-key "5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a" --code-size-limit 50000

update-abis:
	forge inspect UniswapV3Factory abi > ui/src/abi/Factory.json
	forge inspect UniswapV3Manager abi > ui/src/abi/Manager.json
	forge inspect UniswapV3Pool abi > ui/src/abi/Pool.json
	forge inspect UniswapV3Quoter abi > ui/src/abi/Quoter.json

test:
	forge test --ffi