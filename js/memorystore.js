var root = window || exports;

root.store = {

    users: {},

    populate: function () {

        this.users[1] = {
            id: 1,
            name: "Mike Polo",
            email: "mike@example.org",
            mobile: "123-123-1234",
            description: "",
            picture: "placeholder.gif"
        };
        this.users[2] = {
            id: 2,
            name: "Tom Colon",
            email: "tom@example.org",
            mobile: "234-234-2345",
            description: "",
            picture: "placeholder.gif"
        };
        this.users[3] = {
            id: 3,
            name: "Sam Black",
            email: "sam@example.org",
            mobile: "345-345-3456",
            description: "",
            picture: "placeholder.gif"
        };
        this.users[4] = {
            id: 4,
            name: "Owen Blue",
            email: "owen@example.org",
            mobile: "456-456-4567",
            description: "",
            picture: "placeholder.gif"
        };
        this.users[5] = {
            id: 5,
            name: "Mark White",
            email: "mark@example.org",
            mobile: "567-567-5678",
            description: "",
            picture: "placeholder.gif"
        };

        this.lastId = 5;
    },

    find: function (model) {
        return this.users[model.id];
    },

    findAll: function () {
        return _.values(this.users);
    },

    create: function (model) {
        this.lastId++;
        model.set('id', this.lastId);
        this.users[this.lastId] = model;
        return model;
    },

    update: function (model) {
        this.users[model.id] = model;
        return model;
    },

    destroy: function (model) {
        delete this.users[model.id];
        return model;
    }
};

store.populate();

Backbone.sync = function (method, model, options) {

    var resp;

    switch (method) {
        case "read":
            resp = model.id ? store.find(model) : store.findAll();
            break;
        case "create":
            resp = store.create(model);
            break;
        case "update":
            resp = store.update(model);
            break;
        case "delete":
            resp = store.destroy(model);
            break;
    }

    if (resp) {
        options.success(resp);
    } else {
        options.error("Record not found");
    }
};
