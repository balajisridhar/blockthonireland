# blockthonireland
Repository for HSE PoC for Blockathon Ireland


## 1. Starting Hyperledger Fabric

** Note: **
<p>If you have previously used an older version of <strong>Hyperledger Composer</strong> and are now setting up a new install, you may want to kill and remove all previous Docker containers, which you can do with these commands:</p>
<div class="highlight"><pre><code class="language-" data-lang="">    
    docker kill $(docker ps -q)
    docker rm $(docker ps -aq)
    docker rmi -f $(docker images -q)
</code></pre></div>


First download the docker files for Fabric in preparation for creating a Composer profile.  Hyperledger Composer uses Connection Profiles to connect to a runtime. A Connection Profile is a JSON document that lives in the user's home directory (or may come from an environment variable) and is referenced by name when using the Composer APIs or the Command Line tools. Using connection profiles ensures that code and scripts are easily portable from one runtime instance to another.

The PeerAdmin card is a special ID card used to administer the local Hyperledger Fabric. In a development installation, such as the one on your computer, the PeerAdmin ID card is created when you install the local Hyperledger Fabric.

The form for a PeerAdmin card for a Hyperledger Fabric v1.0 network is PeerAdmin@hlfv1.  In general, the PeerAdmin is a special role reserved for functions such as:

* Deploying business networks
* Creating, issuing, and revoking ID cards for business network admins*

First, clone the contents of this repo locally and cd into the project folder by running these commands:

```bash
git clone https://github.com/IBM/BlockchainNetwork-CompositeJourney.git

cd BlockchainNetwork-CompositeJourney
```

Then, start the Fabric and create a Composer profile using the following commands:
```bash
./downloadFabric.sh
./startFabric.sh
./createPeerAdminCard.sh
```  

No need to do it now; however as an fyi - you can stop and tear down Fabric using:
```
./stopFabric.sh
./teardownFabric.sh
```

## 2. Deploy the Business Network Archive on Hyperledger Composer running locally (alternative deployment approach)

Deploying a business network to the Hyperledger Fabric requires the Hyperledger Composer chaincode to be installed on the peer, then the business network archive (`.bna`) must be sent to the peer, and a new participant, identity, and associated card must be created to be the network administrator. Finally, the network administrator business network card must be imported for use, and the network can then be pinged to check it is responding.

Change directory to the `dist` folder containing `my-network.bna` file.

The `composer network install` command requires a PeerAdmin business network card (in this case one has been created and imported in advance), and the name of the business network. To install the composer runtime, run the following command:
```
cd dist
composer network install --card PeerAdmin@hlfv1 --archiveFile build/Business Network Files/HSE_Network_v0.1.bna
```

The `composer network start` command requires a business network card, as well as the name of the admin identity for the business network, the file path of the `.bna` and the name of the file to be created ready to import as a business network card. To deploy the business network, run the following command:
```
composer network start --networkName HSE_Network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
```

The `composer card import` command requires the filename specified in `composer network start` to create a card. To import the network administrator identity as a usable business network card, run the following command:
```
composer card import --file networkadmin.card
```

You can verify that the network has been deployed by typing:
```
composer network ping --card admin@HSE_Network
```

You should see the the output as follows:
```
The connection to the network was successfully tested: my-network
	Business network version: 0.0.1
  version: 0.20.5
	participant: org.hyperledger.composer.system.Identity#82c679fbcb1541eafeff1bc71edad4f2c980a0e17a5333a6a611124c2addf4ba

Command succeeded
```

To integrate with the deployed business network (creating assets/participants and submitting transactions) we can either use the Composer Node SDK or we can generate a REST API. To create the REST API we need to launch the `composer-rest-server` and tell it how to connect to our deployed business network. Now launch the server by changing directory to the project working directory and type:
```bash
cd ..
composer-rest-server
```

Answer the questions posed at startup. These allow the composer-rest-server to connect to Hyperledger Fabric and configure how the REST API is generated.
* Enter `admin@my-network` as the card name.
* Select `never use namespaces` when asked whether to use namespaces in the generated API.
* Select `No` when asked whether to secure the generated API.
* Select `No` when asked whether to enable authentication with Passport.
* Select `No` when asked if you want to enable the explorer test interface.
* Select `No` when asked if you want to enable dynamic logging.
* Select `Yes` when asked whether to enable event publication.
* Select `No` when asked whether to enable TLS security.

If the composer-rest-server started successfully you should see these output lines:
```
Discovering types from business network definition ...
Discovered types from business network definition
Generating schemas for all types in business network definition ...
Generated schemas for all types in business network definition
Adding schemas for all types to Loopback ...
Added schemas for all types to Loopback
Web server listening at: http://localhost:3000
Browse your REST API at http://localhost:3000/explorer
```

Open a web browser and navigate to http://localhost:3000/explorer

You should see the LoopBack API Explorer, allowing you to inspect and test the generated REST API. Follow the instructions to test Business Network Definition as mentioned above in the composer section