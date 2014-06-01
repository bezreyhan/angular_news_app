'use strict';

app.controller('ProfileCtrl',
  function ($scope, $routeParams, Post, User) {
    
    $scope.commentedPosts = {};
    
    $scope.user = User.findByUsername($routeParams.username);

    $scope.user.$on('loaded', function () {
      populatePosts();
      populateComments();
    });

    function populatePosts() {
      // console.log($scope.user.posts);
      $scope.posts = {};

      angular.forEach($scope.user.posts, function (postId) {
        $scope.posts[postId] = Post.find(postId);
      });
    }

    function populateComments() {

      $scope.comments = {};

      angular.forEach($scope.user.comments, function (comment) {
        var post = Post.find(comment.postId);

        post.$on('loaded', function () {
          $scope.comments[comment.id] = post.$child('comments').$child(comment.id);

          $scope.commentedPosts[comment.postId] = post;
        });
      });
    }

  });

