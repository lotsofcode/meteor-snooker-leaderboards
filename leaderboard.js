// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Games   = new Meteor.Collection("games");
Players = new Meteor.Collection("players");
Frames  = new Meteor.Collection("frames");
Shots   = new Meteor.Collection("shots");

/**
 * Client
 */

if (Meteor.isClient) {
  Template.leaderboard.players = function () {
    return Players.find({}, {sort: {score: -1, name: 1}});
  };

  Template.leaderboard.selected_name = function () {
    var player = Players.findOne(Session.get("selected_player"));
    return player && player.name;
  };

  Template.player.selected = function () {
    return Session.equals("selected_player", this._id) ? "selected" : '';
  };

  Template.leaderboard.events({
    'click input.inc': function () {
      Players.update(Session.get("selected_player"), { $inc : { score : 5 } });
    },
    'click input.new': function (e) {
      console.log("NEW GAME")
      console.log(e)

      // Games.insert({ });
    }
  });

  Template.player.events({
    'click': function () {
      Session.set("selected_player", this._id);
    }
  });
}

/**
 * Server
 */

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
      // var names = ["Ronnie O'Sullivan", "Barry Hawkins"];
      // for (var i = 0; i < names.length; i++) {
      //   Players.insert({
      //     name  : names[i],
      //     score : 0
      //   });
      // }
    }
  });
}
