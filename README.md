# @@time(at a time)

## Idea

On a Wednesday night traveling by cab, I felt how many people would be doing the same activity as me at the same time. That's when I started implementing @@time(at a time).

@@time is a simple application that lets users mark their current activity and then check the list of other users doing the same activity at that time around the world.

## Sample Screenshots

## Dev related Info

**Error during firebase init**
Check that the storage is enabled on Fireabse and billing is enabled for the app from the GCP
https://console.cloud.google.com/billing

**How to test cloud functions locally**
Complete article here: https://firebase.google.com/docs/functions/local-shell

Export the admin key from GCP and run
`export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json"
firebase functions:shell`

You can run the shell command from root firebase directory or functions directory
