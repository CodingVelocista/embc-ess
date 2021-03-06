﻿using Xunit;
using Xunit.Abstractions;

namespace embc_unit_tests
{
    public class AutoMapperConfigTests : TestBase
    {
        public AutoMapperConfigTests(ITestOutputHelper output) : base(output)
        {
        }

        [Fact]
        public void AssertConfig()
        {
            Mapper.ConfigurationProvider.AssertConfigurationIsValid();
        }
    }
}