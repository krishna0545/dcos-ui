jest.dontMock("../ACLGroupsActions");
jest.dontMock("../AppDispatcher");
jest.dontMock("../../config/Config");
jest.dontMock("../../constants/ActionTypes");
jest.dontMock("../../utils/RequestUtil");

let ACLGroupsActions = require("../ACLGroupsActions");
let ActionTypes = require("../../constants/ActionTypes");
var AppDispatcher = require("../AppDispatcher");
let Config = require("../../config/Config");
let RequestUtil = require("../../utils/RequestUtil");

describe("ACLGroupsActions", function () {

  beforeEach(function () {
    this.configuration = null;
    this.requestUtilJSON = RequestUtil.json;
    RequestUtil.json = configuration => {
      this.configuration = configuration;
    };
    Config.rootUrl = "http://mesosserver";
    Config.useFixtures = false;
  });

  afterEach(function () {
    RequestUtil.json = this.requestUtilJSON;
  });

  describe("#fetch", function () {

    it("dispatches the correct action when successful", function () {
      ACLGroupsActions.fetch();
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.type).toEqual(ActionTypes.REQUEST_ACL_GROUPS_SUCCESS);
      });

      this.configuration.success({foo: "bar"});
    });

    it("dispatches the correct action when unsuccessful", function () {
      ACLGroupsActions.fetch();
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.type).toEqual(ActionTypes.REQUEST_ACL_GROUPS_ERROR);
      });

      this.configuration.error({message: "bar"});
    });

    it("calls #json from the RequestUtil", function () {
      spyOn(RequestUtil, "json");
      ACLGroupsActions.fetch();
      expect(RequestUtil.json).toHaveBeenCalled();
    });

    it("fetches data from the correct URL", function () {
      spyOn(RequestUtil, "json");
      ACLGroupsActions.fetch();
      expect(RequestUtil.json.mostRecentCall.args[0].url)
        .toEqual("http://mesosserver/api/v1/groups");
    });

  });

  describe("#fetchGroup", function () {

    beforeEach(function () {
      ACLGroupsActions.fetchGroup("foo");
    });

    it("dispatches the correct action when successful", function () {
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.type).toEqual(ActionTypes.REQUEST_ACL_GROUP_SUCCESS);
      });

      this.configuration.success({bar: "baz"});
    });

    it("dispatches with the correct data when successful", function () {
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.data).toEqual({bar: "baz"});
      });

      this.configuration.success({bar: "baz"});
    });

    it("dispatches the correct action when unsucessful", function () {
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.type).toEqual(ActionTypes.REQUEST_ACL_GROUP_ERROR);
      });

      this.configuration.error({message: "bar"});
    });

    it("dispatches with the correct data when unsucessful", function () {
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.data).toEqual("bar");
      });

      this.configuration.error({message: "bar"});
    });

    it("dispatches with the groupID when unsucessful", function () {
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.groupID).toEqual("foo");
      });

      this.configuration.error({message: "bar"});
    });

  });

  describe("#fetchGroupUsers", function () {

    beforeEach(function () {
      ACLGroupsActions.fetchGroupUsers("foo");
    });

    it("dispatches the correct action when successful", function () {
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.type)
          .toEqual(ActionTypes.REQUEST_ACL_GROUP_USERS_SUCCESS);
      });

      this.configuration.success({bar: "baz"});
    });

    it("dispatches with the correct data when successful", function () {
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.data).toEqual({bar: "baz"});
      });

      this.configuration.success({bar: "baz"});
    });

    it("dispatches with the groupID successful", function () {
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.groupID).toEqual("foo");
      });

      this.configuration.success({bar: "baz"});
    });

    it("dispatches the correct action when unsucessful", function () {
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.type)
          .toEqual(ActionTypes.REQUEST_ACL_GROUP_USERS_ERROR);
      });

      this.configuration.error({message: "bar"});
    });

    it("dispatches with the correct data when unsucessful", function () {
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.data).toEqual("bar");
      });

      this.configuration.error({message: "bar"});
    });

    it("dispatches with the groupID when unsucessful", function () {
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.groupID).toEqual("foo");
      });

      this.configuration.error({message: "bar"});
    });

  });

  describe("#fetchGroupPermissions", function () {

    beforeEach(function () {
      ACLGroupsActions.fetchGroupPermissions("foo");
    });

    it("dispatches the correct action when successful", function () {
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.type)
          .toEqual(ActionTypes.REQUEST_ACL_GROUP_PERMISSIONS_SUCCESS);
      });

      this.configuration.success({bar: "baz"});
    });

    it("dispatches with the correct data when successful", function () {
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.data).toEqual({bar: "baz"});
      });

      this.configuration.success({bar: "baz"});
    });

    it("dispatches with the groupID successful", function () {
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.groupID).toEqual("foo");
      });

      this.configuration.success({bar: "baz"});
    });

    it("dispatches the correct action when unsucessful", function () {
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.type)
          .toEqual(ActionTypes.REQUEST_ACL_GROUP_PERMISSIONS_ERROR);
      });

      this.configuration.error({message: "bar"});
    });

    it("dispatches with the correct data when unsucessful", function () {
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.data).toEqual("bar");
      });

      this.configuration.error({message: "bar"});
    });

    it("dispatches with the groupID when unsucessful", function () {
      let id = AppDispatcher.register(function (payload) {
        let action = payload.action;
        AppDispatcher.unregister(id);
        expect(action.groupID).toEqual("foo");
      });

      this.configuration.error({message: "bar"});
    });

  });

});
