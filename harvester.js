Invoices = new Meteor.Collection(null);
Projects = new Meteor.Collection(null);


if (Meteor.isClient) {
    var invoices = Meteor.call('invoices', function(error, results) {
        console.log(results.data);
          for(i=0;i<results.data.length;i++) {
              var invoice_id = Invoices.insert(results.data[i].invoices);
          }
    });

    var projects = Meteor.call('projects', function(error, results) {
        console.log(results.data);
          for(i=0;i<results.data.length;i++) {
              var project_id = Projects.insert(results.data[i].project);
          }
    });

  Template.projects.helpers({
    projects: function() {
      return Projects.find();
    }
  });

  Template.invoices.helpers({
    invoice: function() {
      return Invoices.find();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {


    Meteor.methods({
        invoices: function () {
            this.unblock();
            return Meteor.http.call("GET", "https://d2tstudio.harvestapp.com/invoices", {
                                    auth:     'derry@d2tstudio.com:' ,
                                    headers: {  'Content-Type': 'application/json',
                                                'Accept': 'application/json' }
                            });
        },
        projects: function () {
            this.unblock();
            return Meteor.http.call("GET", "https://d2tstudio.harvestapp.com/projects", {
                                    auth:     'derry@d2tstudio.com:' ,
                                    headers: {  'Content-Type': 'application/json',
                                                'Accept': 'application/json' }
                            });
        }
    });// end methods



  });
}
