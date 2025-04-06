### Set up redux
### Set up appwrite
### complete login functionality
### complete signup functionality

### set Gemini AI
### After login redirect to choose language and level page 
    - after hitting enter 
        > Check if user has attempted less than 10 tests, if not
        - generate the question with unique id
        - save the id and question and answer in database 
        - navigate to test page with test id
        > If yes , show a popup message / redirect to subscription

### In test page 
    - fetch test from database using id
    - save the response if user leave the page 
    - refetch the problem and resonse if user refresh the page
    - after submit user navigate to result page

### In result page
    - Compare the answer and show correct answer and user response/answer
    - Ask AI to generate a remark or comment (optional)
    - Show remark and tips


# Datbases
    1. All user basic details -> Authentication Data
    2. All test data , contains question , answer , test_id -> All Test Data
    3. User Test Data
    
