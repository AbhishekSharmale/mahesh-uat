import { trackUserLogin } from './userTracking'

// Migrate existing Firebase users to Supabase tracking
export const migrateExistingUser = async (user) => {
  try {
    // Check if user already migrated
    const migrationKey = `migrated_${user.id}`
    if (localStorage.getItem(migrationKey)) {
      return { success: true, alreadyMigrated: true }
    }

    // Track this login as a migration
    await trackUserLogin(user.id, user.email, 'firebase_migration')
    
    // Mark user as migrated
    localStorage.setItem(migrationKey, 'true')
    
    console.log(`User ${user.email} migrated to Supabase tracking`)
    return { success: true, alreadyMigrated: false }
  } catch (error) {
    console.error('Error migrating user:', error)
    return { success: false, error }
  }
}

// Batch migrate users (for admin use)
export const batchMigrateUsers = async (users) => {
  const results = {
    migrated: 0,
    alreadyMigrated: 0,
    failed: 0
  }

  for (const user of users) {
    const result = await migrateExistingUser(user)
    if (result.success) {
      if (result.alreadyMigrated) {
        results.alreadyMigrated++
      } else {
        results.migrated++
      }
    } else {
      results.failed++
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  return results
}