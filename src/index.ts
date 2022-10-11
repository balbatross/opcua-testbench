import { DataType, OPCUAServer, Variant } from "node-opcua";

(async () => {
    const server = new OPCUAServer({
        port: 4840
    });

    console.log("Server initialisation...");

    await server.initialize();
    
    console.log("Server initialised!");

    const namespace = server.engine.addressSpace?.getOwnNamespace();

    const someObject = namespace?.addObject({
        browseName: "SomeObject",
        organizedBy: server.engine.addressSpace?.rootFolder.objects
    });

    namespace?.addVariable({
        browseName: "SomeVariable",
        dataType: DataType.String,
        componentOf: someObject,
        value: {
            get: () => {
                return new Variant({dataType: DataType.String, value: "Variable"});
            }
        }
    })
    
    console.log("Server starting...");

    await server.start();

    console.log("Server started!");

})();