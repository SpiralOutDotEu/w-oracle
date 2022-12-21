import sys, json
from web3 import Web3

def runSomeComplexComputation(input):
    # validate that the input is valid and provide a score result
    # computation hash can be extracted also
    return {
        "result": 9,
        "hash": Web3.solidityKeccak(['string'], input).hex()
    }
    
def main():
    args = sys.argv[1:]
    result = runSomeComplexComputation(args)
    json_result = json.dumps(result)
    with open("output/result.json", "w") as outfile:
        outfile.write(json_result)    
    print("Result: ", json_result)

if __name__ == "__main__":
    main()