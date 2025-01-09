const formatRupiah = (salary) => {
    salary = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(salary);
    return salary;
  };
  
  
  module.exports = formatRupiah