from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User, Team, Activity, Leaderboard, Workout
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing users in the OctoFit Tracker app.
    Provides CRUD operations for user management.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TeamViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing teams in the OctoFit Tracker app.
    Provides CRUD operations for team management.
    """
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing activities in the OctoFit Tracker app.
    Provides CRUD operations for activity logging and tracking.
    """
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    
    @action(detail=False, methods=['get'])
    def by_user(self, request):
        """Get all activities for a specific user"""
        user_id = request.query_params.get('user_id', None)
        if user_id:
            activities = Activity.objects.filter(user_id=user_id)
            serializer = self.get_serializer(activities, many=True)
            return Response(serializer.data)
        return Response({'error': 'user_id parameter is required'}, status=status.HTTP_400_BAD_REQUEST)


class LeaderboardViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing leaderboard in the OctoFit Tracker app.
    Provides CRUD operations and ranking functionality.
    """
    queryset = Leaderboard.objects.all().order_by('-total_points')
    serializer_class = LeaderboardSerializer
    
    @action(detail=False, methods=['get'])
    def top_users(self, request):
        """Get top N users by points"""
        limit = int(request.query_params.get('limit', 10))
        top_users = Leaderboard.objects.all().order_by('-total_points')[:limit]
        serializer = self.get_serializer(top_users, many=True)
        return Response(serializer.data)


class WorkoutViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing workouts in the OctoFit Tracker app.
    Provides CRUD operations and workout recommendations.
    """
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    
    @action(detail=False, methods=['get'])
    def by_difficulty(self, request):
        """Get workouts filtered by difficulty level"""
        difficulty = request.query_params.get('difficulty', None)
        if difficulty:
            workouts = Workout.objects.filter(difficulty=difficulty)
            serializer = self.get_serializer(workouts, many=True)
            return Response(serializer.data)
        return Response({'error': 'difficulty parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get workouts filtered by category"""
        category = request.query_params.get('category', None)
        if category:
            workouts = Workout.objects.filter(category=category)
            serializer = self.get_serializer(workouts, many=True)
            return Response(serializer.data)
        return Response({'error': 'category parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
