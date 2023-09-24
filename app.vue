<template>
  <div>
    <h1>Opportunity Cost Calculator for Building a Web System</h1>
    <div class="row">
      <div class="column">
        <p>
          <label>
            Your Last Year's Revenue:
            <input type="text" v-model.number="lastYearsRevenue" />
          </label>
          <label>
            Hours a day you would spend doing it yourself:
            <input type="text" v-model.number="hoursDaily" />
          </label>
          <label>
            Web System at what Growth Stage, based on my costs and timeline:
            <select v-model="selectedWebsiteOption">
              <option value="6000,40">MVP Web System: $6,000, 2 Months</option>
              <option value="20000,160">PMF Web System: $20,000, 4 Months</option>
              <option value="60000,480">GTM Web System: $60,000, 6 Months</option>
            </select>
          </label>
          <label>
            Tech Ability Multiplier:
            <select v-model="techAbility">
              <option value="2">No Design or Code Skills</option>
              <option value="1.5">Some design and no-code skills</option>
            </select>
          </label>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <h2>If you built this</h2>
        <p>Cost for YOU to build: ${{ yourOpportunityCost.toFixed(2) }}</p>
      </div>
      <div class="column">
        <h2>If Porter built this</h2>
        <p>Cost for Porter to Build: ${{ delegatedCost.toFixed(2) }}</p>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <strong>
          {{ opportunityCostComparison }}
        </strong>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastYearsRevenue: 0,
      hoursDaily: 0,
      hourlyCapacity: 0,
      selectedWebsiteOption: "6000,40", // Default to an option with a value of 0
      techAbility: 2, // Default to the 2x multiplier
    };
  },
  computed: {
    fieldsFilled() {
      // Check if any of the fields are non-zero
      return this.lastYearsRevenue > 0 || this.hoursDaily > 0 || parseFloat(this.selectedWebsiteOption) > 0;
    },
    yourOpportunityCost() {
      const techMultiplier = parseFloat(this.techAbility);
      const yourDaysToLaunch = (parseFloat(this.selectedWebsiteOption.split(',')[1]) / 30) * techMultiplier;
      const yourCost = ((this.lastYearsRevenue / 12 / 4 / 5 / 8) * this.hoursDaily * yourDaysToLaunch).toFixed(2);
      const delegatedCost = (parseFloat(this.selectedWebsiteOption.split(',')[0])).toFixed(2);
      return parseFloat(yourCost);
    },
    delegatedCost() {
      return parseFloat(this.selectedWebsiteOption.split(',')[0]);
    },
    opportunityCostComparison() {
      if (!this.fieldsFilled) {
        return "Add some data to get started.";
      }
      const potentialGain = this.yourOpportunityCost - this.delegatedCost;
      const actualGain = parseFloat(this.selectedWebsiteOption.split(',')[0]);
      const gainMultiplier = (potentialGain / actualGain).toFixed(2);
      const gainText = potentialGain > 0 ? "saved" : "lost";
      
      return `You ${gainText} $${Math.abs(potentialGain).toFixed(2)} and experienced a ${gainMultiplier}x gain/loss.`;
    },
  },
};
</script>

<style>
.row {
  display: flex;
  justify-content: center;
}
.column {
  flex: 1;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}
label {
  display: block;
  margin-bottom: 5px;
}
select {
  margin-left: 10px;
}
input[type="number"] {
  width: 100px;
}
</style>
