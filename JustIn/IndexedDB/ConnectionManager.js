
const justIn_DB = 'JustIn_DB'
var request = indexedDB.open('justIn_DB', 1);
var db;

request.onerror = function(event) {
  console.error("Database error: " + event.target.errorCode);
};

request.onsuccess = function(event) {
  db = event.target.result;
  console.log("Database opened successfully");
//   /addData();
  getByUserName("John-Doe2")
};

request.onupgradeneeded = function(event) {
  db = event.target.result;
  console.log("Database created or upgraded");

  // Create object store
  var objectStore = db.createObjectStore('ConnectionTable', { keyPath: "ConnectionUsername"});
  objectStore.createIndex("ConnectionUsername", "ConnectionUsername", { unique: true });
};

// Function to add data
function addData() {
  var transaction = db.transaction(['ConnectionTable'], 'readwrite');
  var objectStore = transaction.objectStore('ConnectionTable');

  var data = [
    {
        ConnectionUsername : 'John-Doe2',
        affinities: {
            'Category1' : 10,
            'Category2' : 52,
            'Category3' : 65,
        },
        Summary : "New Notes2.",
        Notes : "New Summary2"
    }
  ]

  data.forEach(function(item) {
    var request = objectStore.add(item);

    request.onsuccess = function(event) {
      console.log("Data added successfully");
    };

    request.onerror = function(event) {
      console.error("Error adding data: " + event.target.error);
    };
  });

  // Retrieve data after adding
  retrieveData();
}

// Function to retrieve data
function retrieveData() {
  var transaction = db.transaction(['ConnectionTable'], 'readonly');
  var objectStore = transaction.objectStore('ConnectionTable');
  var request = objectStore.openCursor();

  request.onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      console.log(cursor.value);
      console.log(cursor.primaryKey)
      cursor.continue();
    } else {
      console.log("No more data");
    }
  };

  request.onerror = function(event) {
    console.error("Error retrieving data: " + event.target.error);
  };
}

// Function to update data
function updateData(id, newData) {
  var transaction = db.transaction(['ConnectionTable'], 'readwrite');
  var objectStore = transaction.objectStore('ConnectionTable');

  var request = objectStore.put(newData, id);

  request.onsuccess = function(event) {
    console.log("Data updated successfully");
  };

  request.onerror = function(event) {
    console.error("Error updating data: " + event.target.error);
  };
}

// Function to delete data
function deleteData(id) {
  var transaction = db.transaction(['ConnectionTable'], 'readwrite');
  var objectStore = transaction.objectStore('ConnectionTable');

  var request = objectStore.delete(id);

  request.onsuccess = function(event) {
    console.log("Data deleted successfully");
  };

  request.onerror = function(event) {
    console.error("Error deleting data: " + event.target.error);
  };
}

function getByUserName(userName){
    const transaction = db.transaction(["ConnectionTable"]);
    const objectStore = transaction.objectStore("ConnectionTable");
    const request = objectStore.get(userName);
    request.onerror = (event) => {
    // Handle errors!
    };
    request.onsuccess = (event) => {
    // Do something with the request.result!
    console.log(`Data: ${JSON.stringify(request.result)}`);
    };
}