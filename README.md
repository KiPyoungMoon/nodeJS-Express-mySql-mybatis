# nodeJS-Express-mySql-mybatis
# 2022.07.29
# transactionManager 구현, Dao에서 넘겨주는 익명함수가 트랜젝션 작업의 한 단위가 됨. test 코드의 경우 Dao 메서드를 하나씩 호출하므로 한개의 test함수가 어러개의 transaction으로 이루어짐.
