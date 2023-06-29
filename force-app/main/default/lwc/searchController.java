public class SearchController {
    /*
    * @param objectName: the object type we will search in
    * @param fields: A String of the fileds we wang to query. e.g. "Id, Name" 
    * @param filters: A String of the filter we want to apply. e.g. "LoginTime > 2010-09-20T22:16:30.000Z AND LoginTime < 2010-09-21T22:16:30.000Z GROUP BY UserId"
    */
    @AuraEnabled
    public static List<sObject> multiSearch(String objectName, String fields, String filters){
        List<sObject> results;
        // We need at least one filter to be able to search 
        if(String.isNotBlank(filters) && String.isNotBlank(objectName)){
            String query = 'SELECT '+fields+' FROM '+objectName+' WHERE ' + filters;
            List<SObject> sobjList = Database.query( query );
            results = sobjList;
        }
        return results
    }

    @AuraEnabled
    public static List<sObject> search(String objectName, List<String> fields, String searchTerm){
        String searchKeyword = searchTerm + '*';
        String returningQuery = '';
        returningQuery = objectName+' ( Id, '+String.join(fields,',')+')';
        String query = 'FIND :searchKeyword IN ALL FIELDS RETURNING '+returningQuery+' LIMIT 20';
        List<List<sObject>> searchRecords = new List<List<sObject>>();
        List<SObject> sobjList = new List<SObject>();
        if(String.isBlank(searchTerm)){
            String soqlQuery = 'SELECT Id, Name, Type, LastViewedDate FROM RecentlyViewed WHERE Type =\''+objectName+'\' ORDER BY LastViewedDate DESC LIMIT 5';
            sobjList = Database.query( soqlQuery );
            searchRecords.add(sobjList);
        }else{
            searchRecords = Search.Query(Query);
        }
        return searchRecords.get(0);
    }

    @AuraEnabled
    public static sObject getRecentlyCreatedRecord(String recordId, List<String> fields, String objectName){
        sObject createdRecord;
        try {
            String query = 'SELECT Id, '+String.join(fields,',')+' FROM '+objectName+' WHERE Id = \''+recordId+'\'';
            List<SObject> sobjList = Database.query( query );
            createdRecord = sobjList.get(0);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return createdRecord;
    }

    @AuraEnabled
    public static List<sObject> getAllActiveCredential(){
        List<sObject> results;
        String query = 'SELECT Name, Credential_Name__c, Credential_Type__c, Status__c FROM Credential__c WHERE Expiry_Date__c > TODAY ORDER BY Credential_Type__c';
        List<SObject> sobjList = Database.query( query );
        results = sobjList;
        return results;
    }

    // Example of how to get values from a global value set
    @AuraEnabled
    public static List<String> getAllProfession(){
        Schema.DescribeFieldResult F = Contact.Profession__c.getDescribe();
         List<Schema.PicklistEntry> P = F.getPicklistValues();
        List<String> picklistValues = new List<String>();
        for(Schema.PicklistEntry pickValue: p) {
            picklistValues.add(pickValue.getValue());
        }
        return picklistValues;
    }

    @AuraEnabled
    public static List<String> getAllTherapistStatus(){
        Schema.DescribeFieldResult F = Contact.Therapist_Status__c.getDescribe();
        List<Schema.PicklistEntry> P = F.getPicklistValues();
        List<String> picklistValues = new List<String>();
        for(Schema.PicklistEntry pickValue: p) {
            picklistValues.add(pickValue.getValue());
        }
        return picklistValues;
    }

    @AuraEnabled
    public static List<String> getAllLeadStatus(){
        Schema.DescribeFieldResult F = Lead.Status.getDescribe();
        List<Schema.PicklistEntry> P = F.getPicklistValues();
        List<String> picklistValues = new List<String>();
        for(Schema.PicklistEntry pickValue: p) {
            picklistValues.add(pickValue.getValue());
        }
        return picklistValues;
    }

    @AuraEnabled
    public static List<sObject> getContactPlacement(List<String> fields, String Id){
        List<sObject> results;
        String placementFields = String.join(fields,',');
        String query = 'SELECT Id, Name, (SELECT '+ placementFields + ' FROM Placements__r) FROM Contact WHERE Id =\''+Id+'\'';
        List<SObject> sobjList = Database.query( query );
        results = sobjList;
        return results;
    }
}