pragma solidity 0.4.15;


contract Lottery {
    string public name;
    uint8 public count;
    string public desc;
    address public initiator;
    address[] public participants;
    bool public isWaiting = false;

    event Winner(uint128 time, string lotteryName, address[] winners);

    function initiate(string _name, uint8 _count, string _desc) public {
        require(isWaiting == false);
        require(_count > 0);

        name = _name;
        count = _count;
        desc = _desc;
        initiator = msg.sender;
        isWaiting = true;

    }

    function participate() public {
        require(isWaiting == true);
        require(isAddressIncluded(msg.sender, participants) == false);
        participants.push(msg.sender);
    }

    function draw() public {
        require(participants.length > 0);
        require(msg.sender == initiator);
        address[] memory winners = new address[](count);

        for (uint i = 0; i < count; i++) {
            uint index = winnerNumber();
            address winner = participants[index];
            if (isAddressIncluded(winner, winners)) {
                i--;
            } else {
                winners[i] = winner;
            }
        }
        Winner(block.timestamp, name, winners);

        delete participants;
        count = 0;
        isWaiting = false;
    }

    function isAddressIncluded(address one, address[] all) private returns(bool) {
        for (uint i = 0; i < all.length; i++) {
            if (all[i] == one) {
                return true;
            }
        }
        return false;
    }

    function winnerNumber() private returns(uint) {
        return uint(blake2b256(block.timestamp)) % participants.length;
    }


}