const detectPII = (
  field,
  value
) => {

  // NULL CHECK
  if (

    value === null ||

    value === undefined
  ) {

    return null;
  }

  field =
    field.toLowerCase();

  value =
    String(value);

  // EMAIL
  if (

    field.includes("email") ||

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(value)
  ) {

    return {

      type: "EMAIL",

      confidence: 0.95,

      reason:
        "Email detected",
    };
  }

  // PHONE
  if (

    field.includes("phone") ||

    field.includes("mobile") ||

    /^[6-9]\d{9}$/
    .test(value)
  ) {

    return {

      type: "PHONE",

      confidence: 0.92,

      reason:
        "Phone detected",
    };
  }

  // NAME
  if (

    field.includes("name")
  ) {

    return {

      type: "NAME",

      confidence: 0.85,

      reason:
        "Name field detected",
    };
  }

  // ADDRESS
  if (

    field.includes("address")
  ) {

    return {

      type: "ADDRESS",

      confidence: 0.88,

      reason:
        "Address detected",
    };
  }

  // DOB
  if (

    field.includes("dob") ||

    field.includes("birth")
  ) {

    return {

      type:
        "DATE_OF_BIRTH",

      confidence: 0.90,

      reason:
        "DOB detected",
    };
  }

  // AADHAAR
  if (

    field.includes("aadhaar") ||

    field.includes("aadhar") ||

    /^\d{12}$/
    .test(value)
  ) {

    return {

      type: "AADHAAR",

      confidence: 0.96,

      reason:
        "Aadhaar detected",
    };
  }

  // PAN
  if (

    field.includes("pan") ||

    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    .test(value)
  ) {

    return {

      type: "PAN",

      confidence: 0.95,

      reason:
        "PAN detected",
    };
  }

  // BANK ACCOUNT
  if (

    field.includes("bank") ||

    field.includes("account")
  ) {

    return {

      type:
        "BANK_ACCOUNT",

      confidence: 0.87,

      reason:
        "Bank account detected",
    };
  }

  // GENDER
  if (

    field.includes("gender")
  ) {

    return {

      type:
        "GENDER",

      confidence: 0.80,

      reason:
        "Gender detected",
    };
  }

  // CUSTOMER ID
  if (

    field.includes("customer_id") ||

    field.includes("user_id")
  ) {

    return {

      type:
        "CUSTOMER_ID",

      confidence: 0.84,

      reason:
        "Customer ID detected",
    };
  }

  // PASSWORD
  if (

    field.includes("password") ||

    field.includes("passwd")
  ) {

    return {

      type:
        "CREDENTIAL",

      confidence: 0.98,

      reason:
        "Credential field detected",
    };
  }

  return null;
};

module.exports = {
  detectPII,
};