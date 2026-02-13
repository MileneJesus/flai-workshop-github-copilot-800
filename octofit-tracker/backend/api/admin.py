from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'team_id', 'created_at')
    search_fields = ('name', 'email')
    list_filter = ('created_at',)


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at')
    search_fields = ('name',)
    list_filter = ('created_at',)


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'activity_type', 'duration', 'calories', 'distance', 'date')
    search_fields = ('user_id', 'activity_type')
    list_filter = ('activity_type', 'date', 'created_at')


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'team_id', 'total_points', 'rank', 'updated_at')
    search_fields = ('user_id', 'team_id')
    list_filter = ('rank', 'updated_at')
    ordering = ('-total_points',)


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('name', 'difficulty', 'category', 'duration', 'calories_estimate')
    search_fields = ('name', 'category')
    list_filter = ('difficulty', 'category')
