from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime


class UserModelTest(TestCase):
    """Test cases for User model"""
    
    def setUp(self):
        self.user = User.objects.create(
            name="Test User",
            email="test@example.com",
            password="password123"
        )
    
    def test_user_creation(self):
        """Test that a user can be created"""
        self.assertEqual(self.user.name, "Test User")
        self.assertEqual(self.user.email, "test@example.com")
    
    def test_user_str(self):
        """Test the string representation of user"""
        self.assertEqual(str(self.user), "Test User")


class TeamModelTest(TestCase):
    """Test cases for Team model"""
    
    def setUp(self):
        self.team = Team.objects.create(
            name="Test Team",
            description="A test team"
        )
    
    def test_team_creation(self):
        """Test that a team can be created"""
        self.assertEqual(self.team.name, "Test Team")
        self.assertEqual(self.team.description, "A test team")
    
    def test_team_str(self):
        """Test the string representation of team"""
        self.assertEqual(str(self.team), "Test Team")


class ActivityModelTest(TestCase):
    """Test cases for Activity model"""
    
    def setUp(self):
        self.activity = Activity.objects.create(
            user_id="123456789012345678901234",
            activity_type="running",
            duration=30,
            calories=300,
            distance=5.0,
            date=datetime.now()
        )
    
    def test_activity_creation(self):
        """Test that an activity can be created"""
        self.assertEqual(self.activity.activity_type, "running")
        self.assertEqual(self.activity.duration, 30)
        self.assertEqual(self.activity.calories, 300)


class LeaderboardModelTest(TestCase):
    """Test cases for Leaderboard model"""
    
    def setUp(self):
        self.leaderboard = Leaderboard.objects.create(
            user_id="123456789012345678901234",
            team_id="123456789012345678901234",
            total_points=1000,
            rank=1
        )
    
    def test_leaderboard_creation(self):
        """Test that a leaderboard entry can be created"""
        self.assertEqual(self.leaderboard.total_points, 1000)
        self.assertEqual(self.leaderboard.rank, 1)


class WorkoutModelTest(TestCase):
    """Test cases for Workout model"""
    
    def setUp(self):
        self.workout = Workout.objects.create(
            name="Morning Run",
            description="A refreshing morning run",
            difficulty="medium",
            category="cardio",
            duration=30,
            calories_estimate=300
        )
    
    def test_workout_creation(self):
        """Test that a workout can be created"""
        self.assertEqual(self.workout.name, "Morning Run")
        self.assertEqual(self.workout.difficulty, "medium")
        self.assertEqual(self.workout.category, "cardio")
    
    def test_workout_str(self):
        """Test the string representation of workout"""
        self.assertEqual(str(self.workout), "Morning Run")


class UserAPITest(APITestCase):
    """Test cases for User API endpoints"""
    
    def test_create_user(self):
        """Test creating a user via API"""
        data = {
            "name": "API Test User",
            "email": "apitest@example.com",
            "password": "password123"
        }
        response = self.client.post('/api/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_get_users(self):
        """Test getting list of users via API"""
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TeamAPITest(APITestCase):
    """Test cases for Team API endpoints"""
    
    def test_create_team(self):
        """Test creating a team via API"""
        data = {
            "name": "API Test Team",
            "description": "A team created via API"
        }
        response = self.client.post('/api/teams/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_get_teams(self):
        """Test getting list of teams via API"""
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ActivityAPITest(APITestCase):
    """Test cases for Activity API endpoints"""
    
    def test_create_activity(self):
        """Test creating an activity via API"""
        data = {
            "user_id": "123456789012345678901234",
            "activity_type": "running",
            "duration": 30,
            "calories": 300,
            "distance": 5.0,
            "date": datetime.now().isoformat()
        }
        response = self.client.post('/api/activities/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_get_activities(self):
        """Test getting list of activities via API"""
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class LeaderboardAPITest(APITestCase):
    """Test cases for Leaderboard API endpoints"""
    
    def test_get_leaderboard(self):
        """Test getting leaderboard via API"""
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class WorkoutAPITest(APITestCase):
    """Test cases for Workout API endpoints"""
    
    def test_create_workout(self):
        """Test creating a workout via API"""
        data = {
            "name": "Test Workout",
            "description": "A test workout",
            "difficulty": "easy",
            "category": "strength",
            "duration": 20,
            "calories_estimate": 150
        }
        response = self.client.post('/api/workouts/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_get_workouts(self):
        """Test getting list of workouts via API"""
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
