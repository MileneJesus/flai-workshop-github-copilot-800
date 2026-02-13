from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime, timedelta
from api.models import User, Team, Activity, Leaderboard, Workout
from bson import ObjectId


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING('Clearing existing data...'))
        
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        
        self.stdout.write(self.style.SUCCESS('Existing data cleared.'))
        self.stdout.write(self.style.WARNING('Creating teams...'))
        
        # Create teams
        team_marvel = Team.objects.create(
            _id=ObjectId(),
            name='Team Marvel',
            description='Earth\'s Mightiest Heroes',
            created_at=timezone.now()
        )
        
        team_dc = Team.objects.create(
            _id=ObjectId(),
            name='Team DC',
            description='Justice League United',
            created_at=timezone.now()
        )
        
        self.stdout.write(self.style.SUCCESS(f'Created teams: {team_marvel.name}, {team_dc.name}'))
        self.stdout.write(self.style.WARNING('Creating users...'))
        
        # Create Marvel users
        marvel_heroes = [
            {'name': 'Tony Stark', 'email': 'ironman@marvel.com', 'password': 'arc_reactor'},
            {'name': 'Steve Rogers', 'email': 'captain@marvel.com', 'password': 'shield123'},
            {'name': 'Natasha Romanoff', 'email': 'blackwidow@marvel.com', 'password': 'redroom'},
            {'name': 'Bruce Banner', 'email': 'hulk@marvel.com', 'password': 'gamma_ray'},
            {'name': 'Thor Odinson', 'email': 'thor@marvel.com', 'password': 'mjolnir'},
        ]
        
        # Create DC users
        dc_heroes = [
            {'name': 'Clark Kent', 'email': 'superman@dc.com', 'password': 'krypton'},
            {'name': 'Bruce Wayne', 'email': 'batman@dc.com', 'password': 'gotham'},
            {'name': 'Diana Prince', 'email': 'wonderwoman@dc.com', 'password': 'themyscira'},
            {'name': 'Barry Allen', 'email': 'flash@dc.com', 'password': 'speedforce'},
            {'name': 'Arthur Curry', 'email': 'aquaman@dc.com', 'password': 'atlantis'},
        ]
        
        marvel_users = []
        for hero in marvel_heroes:
            user = User.objects.create(
                _id=ObjectId(),
                name=hero['name'],
                email=hero['email'],
                password=hero['password'],
                team_id=str(team_marvel._id),
                created_at=timezone.now()
            )
            marvel_users.append(user)
        
        dc_users = []
        for hero in dc_heroes:
            user = User.objects.create(
                _id=ObjectId(),
                name=hero['name'],
                email=hero['email'],
                password=hero['password'],
                team_id=str(team_dc._id),
                created_at=timezone.now()
            )
            dc_users.append(user)
        
        all_users = marvel_users + dc_users
        self.stdout.write(self.style.SUCCESS(f'Created {len(all_users)} users'))
        self.stdout.write(self.style.WARNING('Creating activities...'))
        
        # Create activities for users
        activity_types = [
            {'type': 'Running', 'duration': 30, 'calories': 300, 'distance': 5.0},
            {'type': 'Cycling', 'duration': 45, 'calories': 400, 'distance': 15.0},
            {'type': 'Swimming', 'duration': 60, 'calories': 500, 'distance': 2.0},
            {'type': 'Weight Training', 'duration': 40, 'calories': 250, 'distance': None},
            {'type': 'Yoga', 'duration': 50, 'calories': 200, 'distance': None},
        ]
        
        activity_count = 0
        for user in all_users:
            for i, activity_data in enumerate(activity_types):
                activity = Activity.objects.create(
                    _id=ObjectId(),
                    user_id=str(user._id),
                    activity_type=activity_data['type'],
                    duration=activity_data['duration'],
                    calories=activity_data['calories'],
                    distance=activity_data['distance'],
                    date=timezone.now() - timedelta(days=i),
                    created_at=timezone.now()
                )
                activity_count += 1
        
        self.stdout.write(self.style.SUCCESS(f'Created {activity_count} activities'))
        self.stdout.write(self.style.WARNING('Creating leaderboard entries...'))
        
        # Create leaderboard entries
        for idx, user in enumerate(all_users):
            total_activities = Activity.objects.filter(user_id=str(user._id))
            total_points = sum(activity.calories for activity in total_activities)
            
            Leaderboard.objects.create(
                _id=ObjectId(),
                user_id=str(user._id),
                team_id=user.team_id,
                total_points=total_points,
                rank=idx + 1,
                updated_at=timezone.now()
            )
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(all_users)} leaderboard entries'))
        self.stdout.write(self.style.WARNING('Creating workouts...'))
        
        # Create workouts
        workouts_data = [
            {
                'name': 'Super Soldier Circuit',
                'description': 'A high-intensity circuit training inspired by Captain America',
                'difficulty': 'hard',
                'category': 'Strength',
                'duration': 45,
                'calories_estimate': 500
            },
            {
                'name': 'Speed Force Sprint',
                'description': 'Lightning-fast interval training for maximum speed',
                'difficulty': 'medium',
                'category': 'Cardio',
                'duration': 30,
                'calories_estimate': 400
            },
            {
                'name': 'Amazonian Warrior Workout',
                'description': 'Build strength and endurance like Wonder Woman',
                'difficulty': 'hard',
                'category': 'Strength',
                'duration': 60,
                'calories_estimate': 600
            },
            {
                'name': 'Web Slinger Flexibility',
                'description': 'Improve flexibility and agility',
                'difficulty': 'easy',
                'category': 'Flexibility',
                'duration': 25,
                'calories_estimate': 150
            },
            {
                'name': 'Dark Knight Training',
                'description': 'Mixed martial arts and combat training',
                'difficulty': 'hard',
                'category': 'Mixed',
                'duration': 50,
                'calories_estimate': 550
            },
            {
                'name': 'Kryptonian Powerlifting',
                'description': 'Heavy lifting routine for maximum strength',
                'difficulty': 'hard',
                'category': 'Strength',
                'duration': 40,
                'calories_estimate': 450
            },
            {
                'name': 'Atlantean Swimming',
                'description': 'Aquatic workout for full-body conditioning',
                'difficulty': 'medium',
                'category': 'Cardio',
                'duration': 35,
                'calories_estimate': 350
            },
            {
                'name': 'Zen Meditation',
                'description': 'Mindfulness and relaxation exercises',
                'difficulty': 'easy',
                'category': 'Mindfulness',
                'duration': 20,
                'calories_estimate': 100
            },
        ]
        
        for workout_data in workouts_data:
            Workout.objects.create(
                _id=ObjectId(),
                **workout_data
            )
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts_data)} workouts'))
        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
        
        # Print summary
        self.stdout.write(self.style.SUCCESS('\n=== Database Summary ==='))
        self.stdout.write(f'Teams: {Team.objects.count()}')
        self.stdout.write(f'Users: {User.objects.count()}')
        self.stdout.write(f'Activities: {Activity.objects.count()}')
        self.stdout.write(f'Leaderboard Entries: {Leaderboard.objects.count()}')
        self.stdout.write(f'Workouts: {Workout.objects.count()}')
