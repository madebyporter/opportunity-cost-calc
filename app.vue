<template>
  <div>
    <h1>Opportunity Cost Calculator</h1>
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
          Duration (in minutes):
          <input type="number" v-model.number="yourDuration" />
        </label>
        <br />
        <p>Opportunity Cost: {{ yourOpportunityCost }}</p>
      </div>
      <div class="column">
        <h2>Delegated Cost</h2>
        <label>
          Cost Type:
          <select v-model="delegatedCostType">
            <option value="hourly">Hourly Rate</option>
            <option value="fixed">Fixed Cost</option>
          </select>
        </label>
        <br />
        <label>
          <span v-if="delegatedCostType === 'hourly'">Hourly Rate:</span>
          <span v-else>Fixed Cost:</span>
          <input type="number" v-model.number="delegatedCost" />
        </label>
        <br />
        <label>
          Duration (in minutes):
          <input type="number" v-model.number="delegatedDuration" />
        </label>
        <br />
        <p>Opportunity Cost: {{ delegatedOpportunityCost }}</p>
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
      delegatedCostType: "hourly",
      delegatedCost: 0,
      delegatedDuration: 0,
    };
  },
  computed: {
    yourOpportunityCost() {
      if (this.yourCostType === "hourly") {
        const hourlyRateInMinutes = this.yourCost / 60;
        return (hourlyRateInMinutes * this.yourDuration).toFixed(2);
      } else {
        return this.yourCost.toFixed(2);
      }
    },
    delegatedOpportunityCost() {
      if (this.delegatedCostType === "hourly") {
        const hourlyRateInMinutes = this.delegatedCost / 60;
        return (hourlyRateInMinutes * this.delegatedDuration).toFixed(2);
      } else {
        return this.delegatedCost.toFixed(2);
      }
    },
    opportunityCostComparison() {
      const yourCost = parseFloat(this.yourOpportunityCost);
      const delegatedCost = parseFloat(this.delegatedOpportunityCost);
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
