const DEFAULT_SERVER_COST = 6500;
const DEFAULT_HOURLY_RATE = 55;

const moneyFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const fields = {
  productionServers: document.getElementById("productionServers"),
  devServers: document.getElementById("devServers"),
  testServers: document.getElementById("testServers"),
  dbServers: document.getElementById("dbServers"),
  osServers: document.getElementById("osServers"),
  thirdPartyHosting: document.getElementById("thirdPartyHosting"),
  otherInfraCosts: document.getElementById("otherInfraCosts"),
  customServerCost: document.getElementById("customServerCost"),
  ftePeople: document.getElementById("ftePeople"),
  fteHoursPerWeek: document.getElementById("fteHoursPerWeek"),
  fteWeeksPerYear: document.getElementById("fteWeeksPerYear"),
  customHourlyRate: document.getElementById("customHourlyRate"),
  upgradePeople: document.getElementById("upgradePeople"),
  upgradeMonths: document.getElementById("upgradeMonths"),
  upgradeHoursPerWeek: document.getElementById("upgradeHoursPerWeek"),
  maintenanceCost: document.getElementById("maintenanceCost")
};

const outputs = {
  appliedServerCost: document.getElementById("appliedServerCost"),
  q1Total: document.getElementById("q1Total"),
  appliedHourlyRate: document.getElementById("appliedHourlyRate"),
  q2Total: document.getElementById("q2Total"),
  q4Total: document.getElementById("q4Total"),
  q3Total: document.getElementById("q3Total"),
  grandTotal: document.getElementById("grandTotal")
};

function readNumber(input) {
  const val = Number.parseFloat(input.value);
  if (Number.isFinite(val) && val > 0) {
    return val;
  }
  return 0;
}

function fmtMoney(value) {
  return moneyFmt.format(value);
}

function calculate() {
  const serverCostInput = readNumber(fields.customServerCost);
  const appliedServerCost = serverCostInput || DEFAULT_SERVER_COST;
  const serverCount =
    readNumber(fields.productionServers) +
    readNumber(fields.devServers) +
    readNumber(fields.testServers) +
    readNumber(fields.dbServers) +
    readNumber(fields.osServers);
  const thirdPartyHosting = readNumber(fields.thirdPartyHosting);
  const otherInfraCosts = readNumber(fields.otherInfraCosts);

  // Workbook note: if third-party hosting is provided, server counts are disregarded.
  const hostingComponent = thirdPartyHosting > 0
    ? thirdPartyHosting
    : serverCount * appliedServerCost;
  const q1Total = hostingComponent + otherInfraCosts;

  const hourlyRateInput = readNumber(fields.customHourlyRate);
  const appliedHourlyRate = hourlyRateInput || DEFAULT_HOURLY_RATE;
  const q2Total =
    readNumber(fields.ftePeople) *
    readNumber(fields.fteHoursPerWeek) *
    readNumber(fields.fteWeeksPerYear) *
    appliedHourlyRate;

  // Spreadsheet formula: (people * avgHoursPerWeek) * (months * 4) * hourlyRate
  const q4Total =
    (readNumber(fields.upgradePeople) * readNumber(fields.upgradeHoursPerWeek)) *
    (readNumber(fields.upgradeMonths) * 4) *
    appliedHourlyRate;

  const q3Total = readNumber(fields.maintenanceCost);
  const grandTotal = q1Total + q2Total + q3Total + q4Total;

  outputs.appliedServerCost.textContent = fmtMoney(appliedServerCost);
  outputs.q1Total.textContent = fmtMoney(q1Total);
  outputs.appliedHourlyRate.textContent = fmtMoney(appliedHourlyRate);
  outputs.q2Total.textContent = fmtMoney(q2Total);
  outputs.q4Total.textContent = fmtMoney(q4Total);
  outputs.q3Total.textContent = fmtMoney(q3Total);
  outputs.grandTotal.textContent = fmtMoney(grandTotal);
}

Object.values(fields).forEach((input) => {
  input.addEventListener("input", calculate);
});

calculate();
