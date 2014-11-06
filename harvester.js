Projects = new Meteor.Collection(null);


if (Meteor.isClient) {
  Template.hello.greeting = function () {
    var iam = Meteor.call('whoAmI', function(error, results) {
        // console.log(results.data);
          for(i=0;i<results.data.length;i++) {
              var project = results.data[i].project;
              console.log(project);
              project_id = Projects.insert(project);

          }
    });
  };

  Template.projects.helpers({
    projects: function() {
      return Projects.find();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {


    Meteor.methods({
        whoAmI: function () {
            this.unblock();
            return Meteor.http.call("GET", "https://d2tstudio.harvestapp.com/projects", {
                                    auth:     'derry@d2tstudio.com:pass' ,
                                    headers: {  'Content-Type': 'application/json',
                                                'Accept': 'application/json' }
                            });
        }
    });// end methods



  });
}
