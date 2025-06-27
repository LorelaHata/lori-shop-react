
# Supabase Setup Instructions

## Step 1: Connect to Supabase
1. Click the green **Supabase** button in the top-right corner of your Lovable interface
2. Follow the prompts to create a new Supabase project or connect to an existing one
3. This will automatically add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables

## Step 2: Run Database Migration
1. Go to your Supabase dashboard (https://supabase.com/dashboard)
2. Navigate to your project
3. Click on **SQL Editor** in the left sidebar
4. Copy and paste the entire contents of `supabase-migrations.sql`
5. Click **Run** to execute the migration

This will create:
- ✅ Products table with all your existing products
- ✅ User profiles table
- ✅ Storage bucket for product images
- ✅ Row Level Security policies
- ✅ Functions and triggers for automated workflows

## Step 3: Create Admin User
After running the migration, you need to create admin users:

1. Go to **Authentication** > **Users** in your Supabase dashboard
2. Click **Add user** and create an admin account:
   - Email: `admin@example.com`
   - Password: `admin123`
   - Confirm password: `admin123`
3. After creating the user, go to **Table Editor** > **user_profiles**
4. Find the user you just created and edit their `role` field to `admin`

You can also create regular consumer accounts the same way (role defaults to `consumer`).

## Step 4: Test Your Setup
1. Log out of your app if you're currently logged in
2. Try logging in with your new admin credentials
3. Navigate to the Admin Dashboard
4. Try adding a new product with image upload
5. Verify the changes persist after refreshing the page

## Features You Now Have:
✅ **Real Authentication**: Powered by Supabase Auth  
✅ **Image Uploads**: Drag & drop or browse files  
✅ **Persistent Storage**: All changes saved to database  
✅ **Real-time Updates**: Changes visible across all users instantly  
✅ **Secure File Storage**: Images stored in Supabase Storage  
✅ **Admin Controls**: Role-based access control  

## Troubleshooting:
- If uploads fail, check your browser's developer console for errors
- Ensure your Supabase project has billing enabled for storage
- Verify your environment variables are properly set
- Check the Network tab in developer tools to see if API calls are working

Your app now has full backend functionality with Supabase! 🎉
