## Synopsis
The database is running locally on the same server as the website and can be accessed via the default mongod port (27017). There are two collections (tables), the 'user' collection and the 'classes'.

## How to Connect
    // Retrieve
    var MongoClient = require('mongodb').MongoClient;
    // Connect to the db
    MongoClient.connect("mongodb://138.197.138.222:27017/famongo", function(err, db) {
        //Handle Error
        if(err) { return console.dir(err); }

        //Access user collection
        db.collection('user', function(err, collection) {});

        //Access classes collection
        db.collection('classes', function(err, collection) {});
    });

## Document Schema Example

### User

    {
	"_id" : "johndoe@gmail.com",
	"name" : "Test Account",
	"pass" : "e9a893d7d6917f6822aa9f9760e8c5e3",
	"online" : false,
	"classUser" : [
		"COMP346YY",
		"ELEC275JJ",
		"ENGR371T",
		"SOEN331W",
		"SOEN341S"
	],
	"classMod" : [
		"COMP348D",
		"ENGR233A"
	]
}


### Classes
    {
	"_id" : "ELEC273JJ",
	"active" : false,
	"time" : [
		"tue/17:45/20:15"
	],
	"name" : "Principles of Electrical Engineering",
	"professor" : "Venkatanarayana Ramachandran",
	"classroom" : "H521",
	"chat":[
    {
        "_id": "keithjohnston@playce.com",
        "name": "Kathleen Klein",
        "time": "2015-09-18T09:49:13 +04:00",
        "message": "Enim nisi cillum laboris deserunt amet non deserunt ea nisi. Adipisicing excepteur ex culpa fugiat. Excepteur proident cupidatat amet sit ipsum nisi sint duis enim dolor aliquip. Exercitation nisi ullamco fugiat labore adipisicing irure aute elit id enim sint ut sunt consectetur. Mollit cillum consectetur est eu proident nostrud commodo sunt Lorem qui eiusmod amet ex. Nulla est amet laboris pariatur anim incididunt cupidatat.\r\n"
    },
    {
        "_id": "kathleenklein@playce.com",
        "name": "Vickie Cardenas",
        "time": "2014-04-14T03:30:31 +04:00",
        "message": "Qui quis anim non mollit excepteur reprehenderit aliquip qui et. In ipsum quis consequat ea. Quis ex sit qui id velit adipisicing sunt nostrud est velit dolore aute nostrud. Consequat non anim do tempor quis non sint voluptate ea sint veniam laborum. Commodo anim tempor enim eu fugiat aliquip. Consequat quis ut qui proident ipsum duis. Commodo cupidatat adipisicing labore culpa sunt Lorem sunt occaecat consectetur labore.\r\n"
    },
    {
        "_id": "vickiecardenas@playce.com",
        "name": "Galloway Sharp",
        "time": "2016-11-10T08:17:27 +05:00",
        "message": "Dolore fugiat quis occaecat do pariatur ut aute ex commodo nisi exercitation irure. Amet sint id incididunt dolor eiusmod anim elit velit ut et consectetur. Amet occaecat ullamco amet aliquip quis laborum id elit nisi. Culpa minim do dolor ad mollit laborum veniam mollit enim nostrud. Aliquip labore velit nulla enim reprehenderit do aute enim. Sint nostrud voluptate do excepteur sit ad fugiat id sint consectetur ex aute est enim. Pariatur elit irure commodo dolor.\r\n"
    },
    {
        "_id": "gallowaysharp@playce.com",
        "name": "Callahan Foley",
        "time": "2014-12-18T10:28:56 +05:00",
        "message": "Aliqua cupidatat minim proident commodo velit voluptate in nisi commodo cupidatat nostrud ut ipsum non. Id anim veniam do voluptate reprehenderit sit mollit Lorem ipsum cillum enim excepteur ipsum. Do proident velit mollit culpa adipisicing. Consequat proident commodo velit aute exercitation cupidatat ea est labore tempor culpa cillum.\r\n"
    },
    {
        "_id": "callahanfoley@playce.com",
        "name": "Schmidt Mayo",
        "time": "2015-05-11T04:07:54 +04:00",
        "message": "Ullamco culpa in irure amet ipsum anim. Elit aliqua ut est non do exercitation et. Consectetur occaecat velit elit consequat laboris aliquip cillum ullamco officia pariatur esse amet aliqua.\r\n"
    },
    {
        "_id": "schmidtmayo@playce.com",
        "name": "Clay Stuart",
        "time": "2014-11-03T11:03:31 +05:00",
        "message": "Ex veniam minim proident fugiat. Culpa aliqua nisi labore non reprehenderit quis elit adipisicing do irure ex irure eiusmod. Et ipsum ut deserunt eiusmod dolor eu adipisicing magna est consectetur pariatur incididunt cillum elit. Cillum dolore aliquip dolore enim aliquip occaecat tempor Lorem qui consequat sunt enim labore. Eu eu mollit est exercitation velit. Reprehenderit laboris non Lorem aliqua occaecat non labore nulla ipsum ipsum pariatur.\r\n"
    },
    {
        "_id": "claystuart@playce.com",
        "name": "Fay Guerra",
        "time": "2016-11-23T12:02:15 +05:00",
        "message": "Qui aute adipisicing deserunt pariatur deserunt aliqua mollit. Voluptate esse nulla minim cupidatat qui excepteur elit veniam qui aliqua consectetur sit. Culpa enim dolore cillum irure eu cillum tempor id. Eu ad qui duis reprehenderit sunt et commodo. Ad aute fugiat mollit eu officia consectetur Lorem cupidatat consequat proident ex.\r\n"
    },
    {
        "_id": "fayguerra@playce.com",
        "name": "Shanna Stein",
        "time": "2014-11-06T01:23:13 +05:00",
        "message": "Officia minim deserunt veniam est cillum sit consectetur qui excepteur ea anim deserunt irure pariatur. Consequat anim proident qui non veniam adipisicing ipsum incididunt minim. Non cupidatat et ullamco labore ipsum deserunt laboris id nulla cillum reprehenderit cupidatat. Sit sunt aute esse anim deserunt.\r\n"
    },
    {
        "_id": "shannastein@playce.com",
        "name": "Browning Kirk",
        "time": "2016-11-03T07:07:44 +04:00",
        "message": "Eu laboris et eiusmod et ipsum elit proident incididunt excepteur deserunt. Eiusmod deserunt excepteur ipsum velit incididunt irure minim adipisicing sint. Adipisicing dolor culpa esse veniam sint duis pariatur officia pariatur veniam incididunt Lorem quis mollit. Eu quis cupidatat cupidatat ut ullamco. Adipisicing culpa exercitation veniam irure amet dolor elit aliquip.\r\n"
    },
    {
        "_id": "browningkirk@playce.com",
        "name": "Hood Middleton",
        "time": "2016-05-02T09:18:28 +04:00",
        "message": "Occaecat id officia amet culpa velit qui duis deserunt nisi pariatur non quis consequat qui. Quis dolore veniam ad labore fugiat eu id velit ut Lorem fugiat. Minim tempor nulla minim exercitation aliqua deserunt in esse do occaecat aliqua elit. Aliquip commodo pariatur non elit eiusmod velit qui adipisicing eu ipsum adipisicing occaecat occaecat elit. Enim occaecat voluptate duis occaecat reprehenderit.\r\n"
    },
    {
        "_id": "hoodmiddleton@playce.com",
        "name": "Faulkner Frederick",
        "time": "2014-09-27T09:16:58 +04:00",
        "message": "Elit sint voluptate id duis. Minim mollit incididunt id consectetur dolore adipisicing sit ipsum est. Fugiat ad laboris eiusmod officia. Labore non quis aliquip veniam. Lorem exercitation exercitation deserunt aute adipisicing deserunt culpa ut ad culpa magna.\r\n"
    },
    {
        "_id": "faulknerfrederick@playce.com",
        "name": "Hudson Lyons",
        "time": "2015-04-18T06:04:17 +04:00",
        "message": "Ex ex cillum do ad labore in non labore eu qui officia. Et aliquip occaecat occaecat reprehenderit ea nostrud adipisicing ipsum nulla sint proident amet. Et ipsum exercitation eu aute elit irure sint laboris amet veniam ipsum incididunt proident eiusmod. Qui aliquip nisi consectetur est sint quis tempor adipisicing ut duis sint proident dolor. Qui exercitation in eu reprehenderit laborum qui est aliqua veniam duis tempor do ea eiusmod.\r\n"
    },
    {
        "_id": "hudsonlyons@playce.com",
        "name": "Emma Guerrero",
        "time": "2015-06-13T06:09:44 +04:00",
        "message": "Dolor laborum cupidatat amet consectetur mollit esse eu aute dolore et enim magna cupidatat culpa. Occaecat ea magna est officia qui mollit. Et sunt incididunt nulla enim aliqua enim. Amet irure deserunt non non minim Lorem non occaecat voluptate eiusmod enim laboris. Anim nostrud culpa nisi amet esse. Nisi minim culpa fugiat occaecat cupidatat magna duis eiusmod. Laborum duis commodo ad adipisicing tempor ad pariatur cillum ullamco ullamco.\r\n"
    },
    {
        "_id": "emmaguerrero@playce.com",
        "name": "George Butler",
        "time": "2014-05-22T09:09:16 +04:00",
        "message": "Commodo exercitation reprehenderit quis nisi enim. Non dolor proident minim amet dolor incididunt nostrud do id laborum ipsum do. Consectetur non commodo qui ut et id amet irure reprehenderit. Veniam mollit cupidatat mollit nostrud esse consectetur cupidatat amet sint commodo aliqua occaecat officia. Ullamco est irure proident reprehenderit adipisicing tempor. Irure voluptate nostrud do ullamco nulla Lorem ad veniam non do. Aliquip Lorem occaecat in officia labore sit proident ad deserunt sint.\r\n"
    },
    {
        "_id": "georgebutler@playce.com",
        "name": "Janelle Simon",
        "time": "2015-12-17T01:03:48 +05:00",
        "message": "Ea est id ex aliqua amet nostrud occaecat tempor ad et nostrud adipisicing nulla proident. Deserunt incididunt velit laborum aute id nisi non velit deserunt nostrud esse irure mollit. Dolor officia adipisicing cupidatat commodo dolore sit ea excepteur anim incididunt. Laborum aute velit consectetur aliquip amet id enim esse dolor pariatur reprehenderit irure. Qui nostrud quis ad consectetur elit veniam exercitation non labore cupidatat. Amet in amet esse eiusmod esse aute.\r\n"
    }]
    }
