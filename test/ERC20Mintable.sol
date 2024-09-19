// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.14;

import "/lib/solmate/src/tokens/ERC20.sol";

// import ".deps/github/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract ERC20Mintable is ERC20 {
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) ERC20(_name, _symbol, _decimals) {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
// '0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47', '0xDA0bab807633f07f013f94DD0E6A4F96F8742B53',
