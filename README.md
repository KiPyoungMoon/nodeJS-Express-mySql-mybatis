# nodeJS-Express-mySql-mybatis
# 2022.07.29
# transactionManager 구현
# Dao에서 익명함수로 트랜젝션 단위를 넘겨줘야 함.
# test 코드의 경우 Dao 메서드를 하나씩 호출하므로 한개의 test함수가 어러개의 transaction으로 이루어짐.
