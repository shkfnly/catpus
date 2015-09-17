# catpus
[Heroku](https://tentacleio.herokuapp.com/)

#Minimum Viable Product

Catpus is a clone of Trello, but incorporating Github integration with some basic visualizations. It allows for people to create ToDo lists for repositories they own, and then be able to check off the tasks using the proper git commit message. Users can:

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Log in with Github
- [ ] Link Github Repositories
- [ ] Have a profile page with details pictures
- [ ] Create organizations
- [ ] See current contributers to repository
- [ ] Assign members to tasks
- [ ] Visualize repository data

##Design Docs

##Implementation Timeline
###Phase 1: Finish User Auth, Model and DB Level Validation. Github API (~1 day)
I will implement user authentication with Github and site level auth. By the end of this phase users will be able to log in with Github, and create boards that are linked to repositories.

[Details][phase-one]

###Phase 2: Finish GitHub Integration and Backbone Scaffolding with Composite Views (~1.5 days)
Users will be able to see their current issues, allowing see them across repositories. Users will submit commits that will check off the commit. This will require the creation of a webhook to implement this functionality.
[phase-one]: ./docs/phase1.md
