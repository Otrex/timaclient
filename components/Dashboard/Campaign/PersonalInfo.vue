<template>
  <div class="py-[1rem]">
    <p class="sm text-[color:--clr-grey-300] mb-[0.75rem]">
      Social Media Platform
    </p>

    <div class="flex flex-row mb-[2rem] gap-[1.25rem]">
      <div class="w-full">
        <DashboardCampaignDataSocialCard
          social="instagram"
          :followers="4200000"
          :engagement-rate="10"
          :likes="600000"
        />
      </div>
      <div class="w-full">
        <DashboardCampaignDataSocialCard
          social="tiktok"
          :followers="3550000"
          :engagement-rate="10"
          :likes="600000"
        />
      </div>
      <div class="w-full">
        <DashboardCampaignDataSocialCard
          social="twitter"
          :followers="4000000"
          :engagement-rate="10"
          :likes="600000"
        />
      </div>
    </div>

    <div class="flex mb-[1.125rem] flex-col md:flex-row gap-[1.125rem]">
      <div class="w-full">
        <StatsAudienceAgeRange />
      </div>
      <div class="w-full">
        <StatsEthnicity />
      </div>
    </div>

    <div
      class="flex mb-[2.625rem] flex-col items-center md:flex-row gap-[1.125rem]"
    >
      <div class="w-full">
        <StatsIncome />
      </div>
      <div class="w-full">
        <StatsLocale />
      </div>
    </div>

    <div>
      <p class="text-[color:--clr-grey-300] mb-[1rem]">
        Campaign experiences (45)
      </p>

      <div class="grid md:grid-cols-3 gap-x-[3.25rem] gap-y-[1.375rem]">
        <div>
          <div class="flex items-center flex-row gap-[0.75rem]">
            <div>
              <div class="w-[3rem] h-[3rem] overflow-hidden rounded-md">
                <img
                  class="w-full h-full object-cover"
                  src="https://s3-alpha-sig.figma.com/img/5ebb/b7ac/d173c2ab9eac7e4886e5e3181567352f?Expires=1704067200&Signature=KT81KiEiH1ZoXZSZ3Zxg9uzkEriY~c3Cq34kSW-hV~f06XAZYV4RFOg-5fQNkVnKwFsVMXb6poL~3mozCr-evXFxSkhIenFxxFFWMADwan4GTkihcbxn2rVBGau4REue0fRmRraiT2OlPB-JuChvSMLtmBe~ja4RtpcFXiHXjVYjdNf6KBdPKXvlsDVX145tR4wEDmUqCMxHCET~mouPeecHxteV3oJEoAXyK5vtN6vmzs6sxhKQr8bsOKk7uykAUwGcHMWdHttz1ibwjpwocfRcZAScuLrCSZ~7Z-5K6UbU5cxNo0BSsKotjK0TBLhUTyNEtd1P6-6hWrNZhSyV4A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                  alt=""
                />
              </div>
            </div>
            <div>
              <p class="nl">Nike Creative Campaign</p>
              <p class="sm text-[color:--clr-grey-300]">
                March 23, 2023 - June 20, 2023
              </p>
            </div>
          </div>
        </div>

        <div>
          <div class="flex items-center flex-row gap-[0.75rem]">
            <div>
              <div class="w-[3rem] h-[3rem] overflow-hidden rounded-md">
                <img
                  class="w-full h-full object-cover"
                  src="https://s3-alpha-sig.figma.com/img/5ebb/b7ac/d173c2ab9eac7e4886e5e3181567352f?Expires=1704067200&Signature=KT81KiEiH1ZoXZSZ3Zxg9uzkEriY~c3Cq34kSW-hV~f06XAZYV4RFOg-5fQNkVnKwFsVMXb6poL~3mozCr-evXFxSkhIenFxxFFWMADwan4GTkihcbxn2rVBGau4REue0fRmRraiT2OlPB-JuChvSMLtmBe~ja4RtpcFXiHXjVYjdNf6KBdPKXvlsDVX145tR4wEDmUqCMxHCET~mouPeecHxteV3oJEoAXyK5vtN6vmzs6sxhKQr8bsOKk7uykAUwGcHMWdHttz1ibwjpwocfRcZAScuLrCSZ~7Z-5K6UbU5cxNo0BSsKotjK0TBLhUTyNEtd1P6-6hWrNZhSyV4A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                  alt=""
                />
              </div>
            </div>
            <div>
              <p class="nl">Nike Creative Campaign</p>
              <p class="sm text-[color:--clr-grey-300]">
                March 23, 2023 - June 20, 2023
              </p>
            </div>
          </div>
        </div>

        <div>
          <div class="flex items-center flex-row gap-[0.75rem]">
            <div>
              <div class="w-[3rem] h-[3rem] overflow-hidden rounded-md">
                <img
                  class="w-full h-full object-cover"
                  src="https://s3-alpha-sig.figma.com/img/5ebb/b7ac/d173c2ab9eac7e4886e5e3181567352f?Expires=1704067200&Signature=KT81KiEiH1ZoXZSZ3Zxg9uzkEriY~c3Cq34kSW-hV~f06XAZYV4RFOg-5fQNkVnKwFsVMXb6poL~3mozCr-evXFxSkhIenFxxFFWMADwan4GTkihcbxn2rVBGau4REue0fRmRraiT2OlPB-JuChvSMLtmBe~ja4RtpcFXiHXjVYjdNf6KBdPKXvlsDVX145tR4wEDmUqCMxHCET~mouPeecHxteV3oJEoAXyK5vtN6vmzs6sxhKQr8bsOKk7uykAUwGcHMWdHttz1ibwjpwocfRcZAScuLrCSZ~7Z-5K6UbU5cxNo0BSsKotjK0TBLhUTyNEtd1P6-6hWrNZhSyV4A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                  alt=""
                />
              </div>
            </div>
            <div>
              <p class="nl">Nike Creative Campaign</p>
              <p class="sm text-[color:--clr-grey-300]">
                March 23, 2023 - June 20, 2023
              </p>
            </div>
          </div>
        </div>

        <div>
          <div class="flex items-center flex-row gap-[0.75rem]">
            <div>
              <div class="w-[3rem] h-[3rem] overflow-hidden rounded-md">
                <img
                  class="w-full h-full object-cover"
                  src="https://s3-alpha-sig.figma.com/img/5ebb/b7ac/d173c2ab9eac7e4886e5e3181567352f?Expires=1704067200&Signature=KT81KiEiH1ZoXZSZ3Zxg9uzkEriY~c3Cq34kSW-hV~f06XAZYV4RFOg-5fQNkVnKwFsVMXb6poL~3mozCr-evXFxSkhIenFxxFFWMADwan4GTkihcbxn2rVBGau4REue0fRmRraiT2OlPB-JuChvSMLtmBe~ja4RtpcFXiHXjVYjdNf6KBdPKXvlsDVX145tR4wEDmUqCMxHCET~mouPeecHxteV3oJEoAXyK5vtN6vmzs6sxhKQr8bsOKk7uykAUwGcHMWdHttz1ibwjpwocfRcZAScuLrCSZ~7Z-5K6UbU5cxNo0BSsKotjK0TBLhUTyNEtd1P6-6hWrNZhSyV4A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                  alt=""
                />
              </div>
            </div>
            <div>
              <p class="nl">Nike Creative Campaign</p>
              <p class="sm text-[color:--clr-grey-300]">
                March 23, 2023 - June 20, 2023
              </p>
            </div>
          </div>
        </div>

        <div>
          <div class="flex items-center flex-row gap-[0.75rem]">
            <div>
              <div class="w-[3rem] h-[3rem] overflow-hidden rounded-md">
                <img
                  class="w-full h-full object-cover"
                  src="https://s3-alpha-sig.figma.com/img/5ebb/b7ac/d173c2ab9eac7e4886e5e3181567352f?Expires=1704067200&Signature=KT81KiEiH1ZoXZSZ3Zxg9uzkEriY~c3Cq34kSW-hV~f06XAZYV4RFOg-5fQNkVnKwFsVMXb6poL~3mozCr-evXFxSkhIenFxxFFWMADwan4GTkihcbxn2rVBGau4REue0fRmRraiT2OlPB-JuChvSMLtmBe~ja4RtpcFXiHXjVYjdNf6KBdPKXvlsDVX145tR4wEDmUqCMxHCET~mouPeecHxteV3oJEoAXyK5vtN6vmzs6sxhKQr8bsOKk7uykAUwGcHMWdHttz1ibwjpwocfRcZAScuLrCSZ~7Z-5K6UbU5cxNo0BSsKotjK0TBLhUTyNEtd1P6-6hWrNZhSyV4A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                  alt=""
                />
              </div>
            </div>
            <div>
              <p class="nl">Nike Creative Campaign</p>
              <p class="sm text-[color:--clr-grey-300]">
                March 23, 2023 - June 20, 2023
              </p>
            </div>
          </div>
        </div>

        <div>
          <div class="flex items-center flex-row gap-[0.75rem]">
            <div>
              <div class="w-[3rem] h-[3rem] overflow-hidden rounded-md">
                <img
                  class="w-full h-full object-cover"
                  src="https://s3-alpha-sig.figma.com/img/5ebb/b7ac/d173c2ab9eac7e4886e5e3181567352f?Expires=1704067200&Signature=KT81KiEiH1ZoXZSZ3Zxg9uzkEriY~c3Cq34kSW-hV~f06XAZYV4RFOg-5fQNkVnKwFsVMXb6poL~3mozCr-evXFxSkhIenFxxFFWMADwan4GTkihcbxn2rVBGau4REue0fRmRraiT2OlPB-JuChvSMLtmBe~ja4RtpcFXiHXjVYjdNf6KBdPKXvlsDVX145tR4wEDmUqCMxHCET~mouPeecHxteV3oJEoAXyK5vtN6vmzs6sxhKQr8bsOKk7uykAUwGcHMWdHttz1ibwjpwocfRcZAScuLrCSZ~7Z-5K6UbU5cxNo0BSsKotjK0TBLhUTyNEtd1P6-6hWrNZhSyV4A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                  alt=""
                />
              </div>
            </div>
            <div>
              <p class="nl">Nike Creative Campaign</p>
              <p class="sm text-[color:--clr-grey-300]">
                March 23, 2023 - June 20, 2023
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
