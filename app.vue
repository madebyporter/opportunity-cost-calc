<template>
  <div>
    <h1>Opportunity Cost Calculator</h1>
    <div class="row">
      <div class="column">
        <p>
        <label>
          Website:
          <!-- Replace all fields with a single select field -->
          <select v-model="selectedWebsiteOption">
            <option value="6000,40">MVP Website: $6,000, 2 Months</option>
            <option value="20000,160">PMF Website: $20,000, 4 Months</option>
            <option value="60000,480">GTM Website: 60,000, 6 Months</option>
          </select>
        </label>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <h2>Your Cost</h2>
        <label>
          Cost Type:
          <select v-model="yourCostType">
            <option value="hourly">Hourly Rate</option>
            <option value="fixed">Fixed Cost</option>
          </select>
        </label>
        <br />
        <label>
          <span v-if="yourCostType === 'hourly'">Hourly Rate:</span>
          <span v-else>Fixed Cost:</span>
          <input type="number" v-model.number="yourCost" />
        </label>
        <br />
        <label>
          Duration (in hours):
          <input type="number" v-model.number="yourDuration" />
        </label>
        <br />
        <p>Opportunity Cost: {{ yourOpportunityCost }}</p>
      </div>
      <div class="column">
        <h2>Delegated Cost</h2>
        <p>Opportunity Cost: {{ formatDelegatedOpportunityCost }}</p>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <p>
          {{ opportunityCostComparison }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yourCostType: "hourly",
      yourCost: 0,
      yourDuration: 0,
      selectedWebsiteOption: "6000,40", // Default to the small website option
    };
  },
  computed: {
    yourOpportunityCost() {
      if (this.yourCostType === "hourly") {
        const hourlyRateInMinutes = this.yourCost;
        return (hourlyRateInMinutes * this.yourDuration).toFixed(2);
      } else {
        return this.yourCost.toFixed(2);
      }
    },
    formatDelegatedOpportunityCost() {
      // Extract cost from the selectedWebsiteOption
      const [cost] = this.selectedWebsiteOption.split(',');
      return `$${parseFloat(cost).toLocaleString()}`;
    },
    opportunityCostComparison() {
      const yourCost = parseFloat(this.yourOpportunityCost);
      const delegatedCost = parseFloat(this.selectedWebsiteOption.split(',')[0]);
      if (yourCost < delegatedCost) {
        return (
          "You'll lose $" +
          (delegatedCost - yourCost).toFixed(2) +
          " by delegating this task."
        );
      } else if (yourCost > delegatedCost) {
        return (
          "You'll save $" +
          (yourCost - delegatedCost).toFixed(2) +
          " by delegating this task."
        );
      } else {
        return "There's no opportunity cost difference between delegating and doing the task yourself.";
      }
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
