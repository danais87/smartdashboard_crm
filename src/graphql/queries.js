/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listOrganizations = /* GraphQL */ `
  query ListOrganizations(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      smName
      smAddress
      l_productType
      l_acquisition
      l_taskStatusType
      l_paymentMethod
      l_discount
      l_team
      l_leadStatus
      l_quoteLibrary
      l_quoteStatus
      funcRegion
      funcIdentityPoolId
      funcName
      funcSource
    }
  }
`;
export const getOrganization = /* GraphQL */ `
  query GetOrganization($filter: TableFilterInput) {
    getOrganization(filter: $filter) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      smName
      smAddress
      l_productType
      l_acquisition
      l_taskStatusType
      l_paymentMethod
      l_discount
      l_team
      l_leadStatus
      l_quoteLibrary
      l_quoteStatus
      funcRegion
      funcIdentityPoolId
      funcName
      funcSource
    }
  }
`;
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      l_smName
      l_email
      l_smAddress
      leadStatus
      seekingService
      adquisition
      account
      notes
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($PK: String!, $SK: String!) {
    getCustomer(PK: $PK, SK: $SK) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      l_smName
      l_email
      l_smAddress
      leadStatus
      seekingService
      adquisition
      account
      notes
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      smName
      description
      price
      typeName
      otherType
      isRecurrent
      isVariant
      l_variant
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($filter: TableFilterInput) {
    getProduct(filter: $filter) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      smName
      description
      price
      typeName
      otherType
      isRecurrent
      isVariant
      l_variant
    }
  }
`;
export const listQuotes = /* GraphQL */ `
  query ListQuotes($filter: TableFilterInput, $limit: Int, $nextToken: String) {
    listQuotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      l_smName
      l_email
      l_smAddress
      leadStatus
      seekingService
      adquisition
      account
      notes
      smName
      smAddress
      l_productType
      l_acquisition
      l_taskStatusType
      l_paymentMethod
      l_discount
      l_team
      l_leadsStatus
      l_quoteLibrary
      l_quoteStatus
      l_variant
      funcRegion
      funcIdentityPoolId
      funcName
      funcSource
      subject
      introduction
      conclusion
      internalComments
      emailSent
      sentDate
      sentBy
      isDiscount
      isInstallment
      downPayment
      numInstallments
      disccountAmount
      l_disccount
      quotationAmount
      finalAmount
      paymentStatus
      orderNumber
      processStatus
      description
      price
      typeName
      otherType
      isRecurrent
      isVariant
      variants
      variantName
      variantPrice
      taskStatus
      taskStart
      taskEnd
      taskNameResponsible
      startDate
      amount
      isPaid
      reference
      method
      payDate
      value
      type
      live
      revisitDate
      customerID
      customerName
    }
  }
`;
export const getQuote = /* GraphQL */ `
  query GetQuote($PK: String!, $SK: String!) {
    getQuote(PK: $PK, SK: $SK) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      l_smName
      l_email
      l_smAddress
      leadStatus
      seekingService
      adquisition
      account
      notes
      smName
      smAddress
      l_productType
      l_acquisition
      l_taskStatusType
      l_paymentMethod
      l_discount
      l_team
      l_leadsStatus
      l_quoteLibrary
      l_quoteStatus
      l_variant
      funcRegion
      funcIdentityPoolId
      funcName
      funcSource
      subject
      introduction
      conclusion
      internalComments
      emailSent
      sentDate
      sentBy
      isDiscount
      isInstallment
      downPayment
      numInstallments
      disccountAmount
      l_disccount
      quotationAmount
      finalAmount
      paymentStatus
      orderNumber
      processStatus
      description
      price
      typeName
      otherType
      isRecurrent
      isVariant
      variants
      variantName
      variantPrice
      taskStatus
      taskStart
      taskEnd
      taskNameResponsible
      startDate
      amount
      isPaid
      reference
      method
      payDate
      value
      type
      live
      revisitDate
      customerID
      customerName
    }
  }
`;
export const listQuoteItems = /* GraphQL */ `
  query ListQuoteItems(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuoteItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      l_smName
      l_email
      l_smAddress
      leadStatus
      seekingService
      adquisition
      account
      notes
      smName
      smAddress
      l_productType
      l_acquisition
      l_taskStatusType
      l_paymentMethod
      l_discount
      l_team
      l_leadsStatus
      l_quoteLibrary
      l_quoteStatus
      l_variant
      funcRegion
      funcIdentityPoolId
      funcName
      funcSource
      subject
      introduction
      conclusion
      internalComments
      emailSent
      sentDate
      sentBy
      isDiscount
      isInstallment
      downPayment
      numInstallments
      disccountAmount
      l_disccount
      quotationAmount
      finalAmount
      paymentStatus
      orderNumber
      processStatus
      description
      price
      typeName
      otherType
      isRecurrent
      isVariant
      variants
      variantName
      variantPrice
      taskStatus
      taskStart
      taskEnd
      taskNameResponsible
      startDate
      amount
      isPaid
      reference
      method
      payDate
      value
      type
      live
      revisitDate
      customerID
      customerName
    }
  }
`;
export const getQuoteItem = /* GraphQL */ `
  query GetQuoteItem($filter: TableFilterInput) {
    getQuoteItem(filter: $filter) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      smName
      description
      price
      typeName
      otherType
      isRecurrent
      isVariant
      variantName
      variantPrice
      internalComments
      taskStatus
      taskStart
      taskEnd
      taskNameresp
      customerName
    }
  }
`;
export const listInstallments = /* GraphQL */ `
  query ListInstallments(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInstallments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      l_smName
      l_email
      l_smAddress
      leadStatus
      seekingService
      adquisition
      account
      notes
      smName
      smAddress
      l_productType
      l_acquisition
      l_taskStatusType
      l_paymentMethod
      l_discount
      l_team
      l_leadsStatus
      l_quoteLibrary
      l_quoteStatus
      l_variant
      funcRegion
      funcIdentityPoolId
      funcName
      funcSource
      subject
      introduction
      conclusion
      internalComments
      emailSent
      sentDate
      sentBy
      isDiscount
      isInstallment
      downPayment
      numInstallments
      disccountAmount
      l_disccount
      quotationAmount
      finalAmount
      paymentStatus
      orderNumber
      processStatus
      description
      price
      typeName
      otherType
      isRecurrent
      isVariant
      variants
      variantName
      variantPrice
      taskStatus
      taskStart
      taskEnd
      taskNameResponsible
      startDate
      amount
      isPaid
      reference
      method
      payDate
      value
      type
      live
      revisitDate
      customerID
      customerName
    }
  }
`;
export const getInstallment = /* GraphQL */ `
  query GetInstallment($PK: String!, $SK: String!) {
    getInstallment(PK: $PK, SK: $SK) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      startDate
      amount
      isPaid
      reference
      method
      payDate
    }
  }
`;
export const listEmployee = /* GraphQL */ `
  query ListEmployee(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployee(filter: $filter, limit: $limit, nextToken: $nextToken) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      l_smName
      email
    }
  }
`;
export const getEmployee = /* GraphQL */ `
  query GetEmployee($PK: String!, $SK: String!) {
    getEmployee(PK: $PK, SK: $SK) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      l_smName
      email
    }
  }
`;
export const listLogs = /* GraphQL */ `
  query ListLogs($filter: TableFilterInput, $limit: Int, $nextToken: String) {
    listLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      table
      type
      idRegistry
      l_value
    }
  }
`;
export const getLogs = /* GraphQL */ `
  query GetLogs($PK: String!, $SK: String!) {
    getLogs(PK: $PK, SK: $SK) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      table
      type
      idRegistry
      l_value
    }
  }
`;
export const listPhoneNumber = /* GraphQL */ `
  query ListPhoneNumber(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPhoneNumber(filter: $filter, limit: $limit, nextToken: $nextToken) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      value
      type
    }
  }
`;
export const getPhoneNumber = /* GraphQL */ `
  query GetPhoneNumber($limit: Int, $nextToken: String) {
    getPhoneNumber(limit: $limit, nextToken: $nextToken) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      value
      type
    }
  }
`;
export const listSmartDash = /* GraphQL */ `
  query ListSmartDash(
    $filter: TableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSmartDash(filter: $filter, limit: $limit, nextToken: $nextToken) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      l_smName
      l_email
      l_smAddress
      leadStatus
      seekingService
      adquisition
      account
      notes
      smName
      smAddress
      l_productType
      l_acquisition
      l_taskStatusType
      l_paymentMethod
      l_discount
      l_team
      l_leadsStatus
      l_quoteLibrary
      l_quoteStatus
      l_variant
      funcRegion
      funcIdentityPoolId
      funcName
      funcSource
      subject
      introduction
      conclusion
      internalComments
      emailSent
      sentDate
      sentBy
      isDiscount
      isInstallment
      downPayment
      numInstallments
      disccountAmount
      l_disccount
      quotationAmount
      finalAmount
      paymentStatus
      orderNumber
      processStatus
      description
      price
      typeName
      otherType
      isRecurrent
      isVariant
      variants
      variantName
      variantPrice
      taskStatus
      taskStart
      taskEnd
      taskNameResponsible
      startDate
      amount
      isPaid
      reference
      method
      payDate
      value
      type
      live
      revisitDate
      customerID
      customerName
    }
  }
`;
export const listAccounts = /* GraphQL */ `
  query ListAccounts($filter: TableFilterInput) {
    listAccounts(filter: $filter) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      smName
      smAddress
      website
    }
  }
`;
export const getAccounts = /* GraphQL */ `
  query GetAccounts($flter: TableFilterInput) {
    getAccounts(flter: $flter) {
      GSP1PK1
      GSP1SK1
      GSP2PK1
      GSP2SK1
      GSP3PK1
      GSP3SK1
      GSP4PK1
      GSP4SK1
      PK
      SK
      id
      entityType
      createdAt
      updateAt
      active
      createdBy
      smName
      smAddress
      website
    }
  }
`;
