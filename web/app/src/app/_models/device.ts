export class Device{
    email: String;
    name: String;
    type: String;
    id: Number; // May need changing according to the data. This should not be the main portion of the data -> just for local storage.
    data: [{
        cardID: String,
        lat: Number,
        lon: Number,
        time: String,
        entry: String
    }];
}